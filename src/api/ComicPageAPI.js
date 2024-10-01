import { validate as isValidUUID } from "uuid";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import {
  db,
  COMIC_VIEWER_PATH,
  BOOKMARK_KEY,
} from "../index";
import {
  DISPLAY_DATA_DOC_KEY,
  CHAP_CONTENTS_KEY,
  PAGES_CONTENTS_KEY,
  CHAP_KEY,
  PAGE_KEY,
  PAGE_CHAP_KEY,
  AUTHOR_KEY,
  PAGE_AUTHOR,
} from "../api/RefKeys";

// RefKeyMap is a singleton that bridges serializable string constants that act as
// query keys for react-query to firestore references. Using references as the keys
// causes infinite revalidation triggers when passed into getDoc()
var RefKeyMap = null;

function getRefKeyMap() {
  if (RefKeyMap == null) {
    // Instatiate
    RefKeyMap = {
      [DISPLAY_DATA_DOC_KEY]: doc(collection(db, "book_data"), "display_data"),
      [CHAP_CONTENTS_KEY]: collection(doc(collection(db, "book_data"), "content"), "chapters"),
      [PAGES_CONTENTS_KEY]: collection(doc(collection(db, "book_data"), "content"), "pages"),
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
  console.log(docSnap)
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
    console.log("Not a valid uuid: ", pageId);
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
