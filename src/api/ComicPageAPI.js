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
  getChaptersInSeason: function (seasonName) {
    const isSeason = (p) => p.seasonName === seasonName;
    let seasons = this.getSeasons();
    let seasonObj = seasons.find(isSeason);
    if (seasonObj == null) {
      //return error about invalid seasonName
      throw ("Invalid season data regarding season: ", seasonName);
    }
    return seasonObj.chapters;
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
  getSeasonNum: function (pageId) {
    const relObjs = this.getRelValidObjs(pageId);
    if (relObjs) {
      return relObjs.seasonObj.id - 1;
    }
    return null;
  },
  getChapterNum: function (pageId) {
    const relObjs = this.getRelValidObjs(pageId);
    if (relObjs) {
      return relObjs.chapterObj.id - 1;
    }
    return null;
  },
  getSeasonOrder: function (seasonName) {
    const isSeason = (p) => p.seasonName === seasonName;
    let seasons = this.getSeasons();
    let season = seasons.find(isSeason);
    return season.order;
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
  getTotalPageCount: function () {
    return pagesData.pageCount;
  },
  getMaxDisplayPage: function () {
    return pagesData.maxDisplayPage;
  },
  getAllPages: function () {
    let pages = [];
    try {
      let seasons = this.getSeasons();
      for (var seasonIndex in seasons) {
        const chapters = this.getChaptersInSeason(
          seasons[seasonIndex].seasonName
        );
        for (var chapterIndex in chapters) {
          chapters[chapterIndex].pages.forEach((p) => pages.push(p));
        }
      }
    } catch (err) {
      throw err;
    }
    return pages;
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
