import pagesData from "./data/pagesData.json";
import users from "./data/users.json";

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

const ComicPageAPI = {
  getFilePath: function (releventObjs) {
    /* This function returns the path relative to the public/MnMPages directory to a page

        Returns a string
    */
    let path = createPath(
      releventObjs.seasonObj.folderName,
      releventObjs.chapterObj.folderName,
      releventObjs.pageObj.filename
    );
    return path;
  },
  getFirstPageId: function () {
    return pagesData.firstDisplayPage;
  },
  getSeason: function (seasons, seasonName) {
    /* This function gets a season object
        
            Parameters:
            seasons - an array of season objects
            seasonName - a string of the season name
        */
    const isSeason = (p) => p.seasonName === seasonName;
    return seasons.find(isSeason);
  },
  getChapterNum: function (pageId) {
    const relObjs = this.getRelValidObjs(pageId);
    if (relObjs) {
      return relObjs.chapterObj.id - 1;
    }
    return null;
  },
  getRelValidObjs: function (pageUuid) {
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
  },
  getMaxDisplayPage: function () {
    return pagesData.maxDisplayPage;
  },
  getSeasons: function () {
    return pagesData.seasons;
  },
  getAdminDisplayName: function (userId) {
    for (let user in users.admins) {
      if (users.admins[user].id === userId) {
        return users.admins[user].displayName;
      }
    }
    return "Mo and Nate";
  },
  isExistingPage: function (id) {
    /* Checks if an id correlates to an existing page */
    return id in pagesData.pageIndex;
  },
};

export default ComicPageAPI;
