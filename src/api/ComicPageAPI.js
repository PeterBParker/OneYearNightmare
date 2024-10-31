import { validate as isValidUUID } from "uuid";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, where, setDoc, getDoc, getDocs, orderBy, query, limit, updateDoc } from "firebase/firestore";
import {
  db,
  storage,
  COMIC_VIEWER_PATH,
  BOOKMARK_KEY,
} from "../index";
import {
  DISPLAY_DATA_DOC_KEY,
  CHAP_CONTENTS_KEY,
  PAGES_CONTENTS_KEY,
  CHAP_KEY,
  CHAP_PAGE_COUNT,
  PAGE_KEY,
  PAGE_UUID,
  PAGE_CHAP_KEY,
  AUTHOR_KEY,
  PAGE_AUTHOR,
  PAGE_TIME_POSTED,
  PAGE_ORDER_IN_CHAP,
  PAGE_ORDER_IN_BOOK,
  COUNTS_DOC_KEY,
  GLOBAL_PAGE_COUNT,
  PAGE_NEXT_PAGE_ID,
  PAGE_PREV_PAGE_ID,
  PAGE_STORAGE_PATH,
  PAGE_SEASON_ID,
  ICON_STORAGE_PATH,
  PAGE_ICON_FILENAME,
  PAGE_URL,
  PAGE_FILENAME,
  SEASON_CONTENTS_KEY,
  SEASON_PAGE_COUNT,
  MAX_PAGE_ID_KEY,
  USERS_KEY,
} from "../api/RefKeys";

import { ADVERBS, ADJECTIVES, NOUNS } from "./data/words";

// *** GETTERS *** //

// RefKeyMap is a singleton that bridges serializable string constants that act as
// query keys for react-query to firestore references. Using references as the keys
// causes infinite revalidation triggers when passed into getDoc()

export function generateDisplayName() {
  const getRandomEntry = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  return getRandomEntry(ADVERBS) + getRandomEntry(ADJECTIVES) + getRandomEntry(NOUNS)
}

var RefKeyMap = null;

function getRefKeyMap() {
  if (RefKeyMap == null) {
    // Instatiate
    RefKeyMap = {
      [DISPLAY_DATA_DOC_KEY]: doc(collection(db, "book_data"), "display_data"),
      [CHAP_CONTENTS_KEY]: collection(doc(collection(db, "book_data"), "content"), "chapters"),
      [SEASON_CONTENTS_KEY]: collection(doc(collection(db, "book_data"), "content"), "seasons"),
      [PAGES_CONTENTS_KEY]: collection(doc(collection(db, "book_data"), "content"), "pages"),
      [COUNTS_DOC_KEY]: doc(collection(db, "book_data"), "counts"),
      [USERS_KEY]: collection(db, "users"),
    };
    // Freeze It
    Object.freeze(RefKeyMap);
  }
  return RefKeyMap;
}

function getRefForKey(key) {
  const map = getRefKeyMap();
  return map[key];
}

export function getUserRef(uid) {
  const users = getRefForKey(USERS_KEY);
  const ref = doc(users, uid)
  return ref
}

export async function getUserData(uid) {
  const ref = getUserRef(uid);
  const docSnap = await getDoc(ref);
  return docSnap.data()
}

function isExistingPage(pageId) {
  let pagesRef = getRefForKey(PAGES_CONTENTS_KEY);
  if (!isValidUUID(pageId)) {
    return false;
  }
  let pageRef = doc(pagesRef, pageId);
  return getDoc(pageRef).then((doc) => {
    if (doc.id === pageId) {
      return true;
    }
    return false;
  }).catch(() => {
    return false;
  })

}

export function getComicHomeURL(maxPageId) {
  let bookmarkedPageUrl = COMIC_VIEWER_PATH + "/";
  let bookmarkedPageId = localStorage.getItem(BOOKMARK_KEY);
  if (bookmarkedPageId && isExistingPage(bookmarkedPageId)) {
    bookmarkedPageUrl = bookmarkedPageUrl.concat(bookmarkedPageId);
  } else {
    // If there is no value stored, we send the reader to the first page on the latest update
    bookmarkedPageUrl = bookmarkedPageUrl.concat(maxPageId);
  }
  return bookmarkedPageUrl;
}

export async function docFetcher({ queryKey }) {
  const [docKey] = queryKey;
  const ref = getRefForKey(docKey);
  // TODO: This getDoc await call is not being cached by useQuery, so it's being called again and again. Find a way to cache this reference?
  const docSnap = await getDoc(ref);
  let data = docSnap.data();
  return data;
}

export async function allPagesFetcher({queryKey}) {
  let result = {"chapters": [], "pages": {}};
  const chapsRef = getRefForKey(CHAP_CONTENTS_KEY);
  const chapQuery = query(chapsRef, orderBy("order"))
  
  const pagesRef = getRefForKey(PAGES_CONTENTS_KEY);
  const pagesQuery = query(pagesRef, orderBy("global_order"))
  
  let [pagesSnap, collSnap] = await Promise.all([
    getDocs(pagesQuery),
    getDocs(chapQuery),
  ]);

  pagesSnap.forEach((page) => {
    let data = page.data()
    if (!(data["chapter_id"] in result["pages"])) {
      result["pages"][data["chapter_id"]] = []; 
    }
    result["pages"][data["chapter_id"]].push(data);
  })
  collSnap.forEach((doc) => {
    result["chapters"].push(doc.data());
  })
  return result;
}

export async function pageFetcher({ queryKey }) {
  // Validate user provided string before blindly sticking it in my query
  const [pageId] = queryKey;
  if (!isValidUUID(pageId)) {
    return {};
  }
  const pageRef = doc(
    collection(doc(collection(db, "book_data"), "content"), "pages"),
    pageId
  );
  const pageSnap = await getDoc(pageRef);
  // Fetch the chapter data for this page
  const chapRef = doc(
    collection(doc(collection(db, "book_data"), "content"), "chapters"),
    pageSnap.data()[PAGE_CHAP_KEY]
  );
  // Fetch the author data for this page
  const userRef = doc(collection(db, "users"), pageSnap.data()[PAGE_AUTHOR]);
  // Parallelize the async calls
  let [chapSnap, userSnap] = await Promise.all([
    getDoc(chapRef),
    getDoc(userRef),
  ]);
  let data = {
    [PAGE_KEY]: pageSnap.data(),
    [CHAP_KEY]: chapSnap.data(),
    [AUTHOR_KEY]: userSnap.data(),
  };

  return data;
}

async function getLatestPageInChapter(chapterId) {
  // TODO try to get from cache and if null get from server OR figure out a different way to cache this query
  let pagesRef = getRefForKey(PAGES_CONTENTS_KEY)
  const q = query(pagesRef, where(PAGE_CHAP_KEY, "==", chapterId), orderBy(PAGE_ORDER_IN_CHAP, "desc"), limit(1))
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length !== 1) {
    throw new Error("unexpected number of pages returned by latest page in chapter query:" + querySnapshot.docs.length)
  }
  return querySnapshot.docs[0].data();
}

// *** SETTERS *** //

export async function setUserData(uid, data) {
  const ref = getUserRef(uid);
  await setDoc(ref, data);
}

export async function updateUserData(uid, data) {
  const ref = getUserRef(uid);
  await updateDoc(ref, data)
}


export async function appendPageToChapter(pageData, imageFile, iconBlob) {
  try {
    await addRequiredFields(pageData, imageFile, iconBlob);
    const PagesRef = getRefForKey(PAGES_CONTENTS_KEY);
    let newPageRef = doc(PagesRef, pageData[PAGE_UUID])
    // update page counts and tell the website to display the new pag
    await Promise.all([
      setDoc(newPageRef, pageData),
      setNextPageId(pageData[PAGE_PREV_PAGE_ID], pageData[PAGE_UUID]),
      setChapPageCount(pageData[PAGE_CHAP_KEY], pageData[PAGE_ORDER_IN_CHAP]),
      setSeasonPageCount(pageData[PAGE_SEASON_ID], pageData[PAGE_ORDER_IN_BOOK]), // TODO: change page data to track pages per season
      setGlobalPageCount(pageData[PAGE_ORDER_IN_BOOK]),
      updateMaxDisplayPage(pageData[PAGE_UUID]),
    ]);
  } catch (err) {
    console.log(err)
    return [false, err]
  }
  return [true, null]
}

async function setNextPageId(currPageID, nextPageID) {
  const pagesRef = getRefForKey(PAGES_CONTENTS_KEY)
  const currPageRef = doc(pagesRef, currPageID)
  await updateDoc(currPageRef,
    {
      [PAGE_NEXT_PAGE_ID]: nextPageID,
    }
  )
}

async function updateMaxDisplayPage(pageID) {
  const displayDataRef = getRefForKey(DISPLAY_DATA_DOC_KEY);
  await updateDoc(displayDataRef, 
    {
      [MAX_PAGE_ID_KEY]: pageID,
    }
  )
}

async function setSeasonPageCount(seasonID, newPageCount) {
  const seasonsRef = getRefForKey(SEASON_CONTENTS_KEY)
  const seasonRef = doc(seasonsRef, seasonID)
  await updateDoc(seasonRef, 
    {
      [SEASON_PAGE_COUNT]: newPageCount,
    }
  )
}

async function setGlobalPageCount(newPageCount) {
  const dataRef = getRefForKey(COUNTS_DOC_KEY)
  await updateDoc(dataRef, 
    {
      [GLOBAL_PAGE_COUNT]: newPageCount,
    }
  )
}

async function setChapPageCount(chapID, newPageCount) {
  const chapsRef = getRefForKey(CHAP_CONTENTS_KEY)
  const chapRef = doc(chapsRef, chapID);
  await updateDoc(chapRef,
    {
      [CHAP_PAGE_COUNT]: newPageCount,
    }
  )
}

async function addRequiredFields(pageData, imageFile, iconBlob) {
  addFilename(pageData, imageFile)
  addCurrentDatetime(pageData)
  addNextPageUUID(pageData)
  addPageUUID(pageData)
  await Promise.all([
    addChapterOrder(pageData),
    addGlobalOrder(pageData),
    addIconURL(pageData, iconBlob), // relies on addFilename being called before
    addPrevPageUUID(pageData),
    addPublicURL(pageData, imageFile),
  ])
}

function addFilename(pageData, imageFile) {
  pageData[PAGE_FILENAME] = imageFile.name
}

function addCurrentDatetime(pageData) {
  let date = new Date();
  let dateStr = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  pageData[PAGE_TIME_POSTED] = dateStr;
}

async function addChapterOrder(pageData) {
  const data = await getLatestPageInChapter(pageData[PAGE_CHAP_KEY])
  const numOfPages = data[PAGE_ORDER_IN_CHAP]
  pageData[PAGE_ORDER_IN_CHAP] = numOfPages+1
}

async function addGlobalOrder(pageData) {
  // TODO try and cache this query somehow
  let displayRef = getRefForKey(COUNTS_DOC_KEY)
  const docSnapshot = await getDoc(displayRef);
  const data = docSnapshot.data();
  pageData[PAGE_ORDER_IN_BOOK] = data[GLOBAL_PAGE_COUNT]+1;
}

async function addIconURL(pageData, iconBlob) {
  const iconsStorageRef = ref(storage, ICON_STORAGE_PATH + pageData[PAGE_FILENAME])
  await uploadBytes(iconsStorageRef, iconBlob)
  const url = await getDownloadURL(iconsStorageRef)
  pageData[PAGE_ICON_FILENAME] = url;
}

function addNextPageUUID(pageData) {
  pageData[PAGE_NEXT_PAGE_ID] = null;
}

async function addPrevPageUUID(pageData) {
  const lastPageData = await getLatestPageInChapter(pageData[PAGE_CHAP_KEY])
  pageData[PAGE_PREV_PAGE_ID] = lastPageData[PAGE_UUID]
}

async function addPublicURL(pageData, file) {
  const pagesStorageRef = ref(storage, PAGE_STORAGE_PATH + file["name"])
  await uploadBytes(pagesStorageRef, file)
  const url = await getDownloadURL(pagesStorageRef)
  pageData[PAGE_URL] = url;
    // make ref public and get download url
    // apparently this can only be done with the admin SDK from the server?
    // TODO: Figure out how to do that step via a cloud function
    // idea 1: setup a cloud function to watch for new pages getting written and then create the public download url and update the document
}

function addPageUUID(pageData) {
  pageData[PAGE_UUID] = uuidv4();
}