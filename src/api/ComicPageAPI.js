import pagesData from "./data/pagesData.json";
import users from "./data/users.json";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../index";
import { DISPLAY_DATA_DOC_KEY } from "../api/RefKeys";

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

export async function getDisplayData(key) {
  const docSnap = await getDoc(
    doc(collection(db, "book_data"), "display_data")
  );
  const displayData = docSnap.data();
  return displayData[key];
}

export async function docFetcher({ queryKey }) {
  const [docKey, fieldKey] = queryKey;
  const ref = getRefForKey(docKey);
  // TODO: This getDoc await call is not being cached by useQuery, so it's being called again and again. Find a way to cache this reference?
  const docSnap = await getDoc(ref);
  const data = docSnap.data();
  if (fieldKey != null && fieldKey.length > 0) {
    return data[fieldKey];
  }
  return data;
}

class ComicPageAPI {
  // Takes a Firebase Firestore object and a Firebase Storage object
  constructor(db, storage) {
    this.db = db;
    this.storage = storage;
    // Reference Constants
    this.bookDataRef = collection(this.db, "book_data");
    this.contentRef = doc(this.bookDataRef, "content");
    this.chaptersRef = collection(this.contentRef, "chapters");
    this.pagesRef = collection(this.contentRef, "pages");
    this.displayRef = doc(this.bookDataRef, "display_data");
    this.countRef = doc(this.bookDataRef, "counts");
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

  getFirstPageId() {
    return pagesData.firstDisplayPage;
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
