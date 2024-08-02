import pagesData from "./data/pagesData.json";
import users from "./data/users.json";
import { validate as isValidUUID } from "uuid";
import { collection, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import {
  db,
  COMIC_VIEWER_PATH,
  BOOKMARK_KEY,
  PageAPI,
  storage,
} from "../index";
import {
  DISPLAY_DATA_DOC_KEY,
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

export function getComicHomeURL(maxPageId) {
  let bookmarkedPageUrl = COMIC_VIEWER_PATH + "/";
  let bookmarkedPageId = localStorage.getItem(BOOKMARK_KEY);
  if (bookmarkedPageId && PageAPI.isExistingPage(bookmarkedPageId)) {
    bookmarkedPageUrl = bookmarkedPageUrl.concat(bookmarkedPageId);
  } else {
    // If there is no value stored, we send the reader to the first page on the latest update
    bookmarkedPageUrl = bookmarkedPageUrl.concat(maxPageId);
  }
  return bookmarkedPageUrl;
}

// Refactor getFilePaths to use pageUuid
function createPath(...pathNodes) {
  let path = "";
  for (let nodeIndex in pathNodes) {
    path += pathNodes[nodeIndex];
    // only append a slash if it's not the final element
    if (nodeIndex < pathNodes.length - 1) {
      path += "/";
    }
  }
  return path;
}

export async function docFetcher({ queryKey }) {
  const [docKey] = queryKey;
  const ref = getRefForKey(docKey);
  // TODO: This getDoc await call is not being cached by useQuery, so it's being called again and again. Find a way to cache this reference?
  const docSnap = await getDoc(ref);
  let data = docSnap.data();
  return data;
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

class ComicPageAPI {
  // Takes a Firebase Firestore object and a Firebase Storage object
  constructor(db, storage) {
    this.db = db;
    this.storage = storage;
    // Reference Constants
    // this.bookDataRef = collection(this.db, "book_data");
    // this.contentRef = doc(this.bookDataRef, "content");
    // this.chaptersRef = collection(this.contentRef, "chapters");
    // this.pagesRef = collection(this.contentRef, "pages");
    // this.displayRef = doc(this.bookDataRef, "display_data");
    // this.countRef = doc(this.bookDataRef, "counts");
  }

  getDisplayData(key) {
    return getDoc(doc(collection(db, "book_data"), "display_data"))
      .then((docSnap) => {
        return docSnap.data()[key];
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

  getFilePath(releventObjs) {
    /* This function returns the path relative to the public/MnMPages directory to a page

        Returns a string
    */
    let path = createPath(
      releventObjs.seasonObj.folderName,
      releventObjs.chapterObj.folderName,
      releventObjs.pageObj.filename
    );
    return path;
  }

  getSeason(seasons, seasonName) {
    /* This function gets a season object
        
            Parameters:
            seasons - an array of season objects
            seasonName - a string of the season name
        */
    const isSeason = (p) => p.seasonName === seasonName;
    return seasons.find(isSeason);
  }

  getChapterNum(pageId) {
    const relObjs = this.getRelValidObjs(pageId);
    if (relObjs) {
      return relObjs.chapterObj.id - 1;
    }
    return null;
  }

  getRelValidObjs(pageUuid) {
    /* This function checks if the page number is valid, and if so
        it returns the relevent Season object, Chapter object, and Page object.

        Parameters:
        pageUuid - The string uuid4 slug of the page       
    */

    let validObjs = {};
    if (pageUuid in pagesData.pageIndex) {
      let pageAddress = pagesData.pageIndex[pageUuid];
      if (pageAddress.seasonIndex in pagesData.seasons) {
        validObjs.seasonObj = pagesData.seasons[pageAddress.seasonIndex];
      } else {
        return null;
      }
      if (pageAddress.chapterIndex in validObjs.seasonObj.chapters) {
        validObjs.chapterObj =
          validObjs.seasonObj.chapters[pageAddress.chapterIndex];
      } else {
        return null;
      }
      if (pageAddress.pageIndex in validObjs.chapterObj.pages) {
        validObjs.pageObj = validObjs.chapterObj.pages[pageAddress.pageIndex];
      } else {
        return null;
      }
      return validObjs;
    } else {
      return null;
    }
  }

  getSeasons() {
    return pagesData.seasons;
  }

  getAdminDisplayName(userId) {
    for (let user in users.admins) {
      if (users.admins[user].id === userId) {
        return users.admins[user].displayName;
      }
    }
    return "Mo and Nate";
  }

  isExistingPage(id) {
    /* Checks if an id correlates to an existing page */
    return id in pagesData.pageIndex;
  }
}

export default ComicPageAPI;
