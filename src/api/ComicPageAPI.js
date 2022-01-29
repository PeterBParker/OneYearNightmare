import pagesData from './data/pagesData.json';
import users from './data/users.json';

const ComicPageAPI = {
    getPage: function (pageId) {
        const releventObjs = this.getRelValidObjs(pageId);
        if (releventObjs) {
            return {
                "seasonPath": releventObjs.seasonObj.folderName,
                "chapterPath": releventObjs.chapterObj.folderName,
                "pagePath": releventObjs.pageObj.filename,
            };
        }
        return null;
    },
    getPageObj: function(pageId) {
        const releventObjs = this.getRelValidObjs(pageId);
        if(releventObjs) {
            return releventObjs.pageObj
        }
        return null;
    },
    getChaptersInSeason: function (seasonName) {
        const isSeason = p => p.seasonName === seasonName;
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
        const isSeason = p => p.seasonName === seasonName;
        return seasons.find(isSeason);
    },
    getSeasonNum: function (pageId) {
        const relObjs = this.getRelValidObjs(pageId);
        if(relObjs) {
            return relObjs.seasonObj.id;
        }
        return null;
    },
    getSeasonOrder: function (seasonName) {
        const isSeason = p => p.seasonName === seasonName;
        let seasons = this.getSeasons();
        let season = seasons.find(isSeason);
        return season.order;
    },
    getRelValidObjs: function (id) {
        /* This function checks if the page address is valid, and if so
            it returns the relevent Season object, Chapter object, and Page object.

            Parameters:
            id - And integer of the page number 
            chapter - A string of the chapter name
            season - A string of the season name        
        */

        if (!this.validatePageId(id)) {
            return null;
        }

        let validObjs = {}
        let seasons = this.getSeasons();
        let pageCount = 0;

        for (let seasonIndex in seasons) {
            let season = seasons[seasonIndex];
            // Checks if the page we're looking for is within the block of the season
            if (id > pageCount && id <= pageCount + season.numOfPages) {
                validObjs.seasonObj = season;
                let chapters = this.getChaptersInSeason(season.seasonName);
                for (let chapterIndex in chapters) {
                    let chapter = chapters[chapterIndex];
                    //Checks if the page we're looking for is within the block of the chapter
                    if (id > pageCount && id <= pageCount + chapter.numOfPages) {
                        validObjs.chapterObj = chapter;
                        let pages = chapter.pages;
                        for (let pageIndex in pages) {
                            let page = pages[pageIndex];
                            if (page.id === id) {
                                validObjs.pageObj = page
                                return validObjs;
                            }
                        }
                    } else {
                        pageCount += chapter.numOfPages;
                    }
                }
            } else {
                pageCount += season.numOfPages;
            }
        }
        return null;
    },
    validatePageId: function (id) {
        let pageCount = this.getMaxDisplayPage();
        if (id > 0 && id <= pageCount) {
            return true;
        } else {
            return false;
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
                const chapters = this.getChaptersInSeason(seasons[seasonIndex].seasonName);
                for (var chapterIndex in chapters) {
                    chapters[chapterIndex].pages.forEach(p => pages.push(p));
                }
            }
        }
        catch (err) {
            throw (err);
        }
        return pages;
    },
    getSeasons: function () {
        return pagesData.seasons;
    },
    getMessageData: function(id) {
        let relObjs = this.getRelValidObjs(id);
        if(!relObjs) {
            return null;
        }
        return(
            {"message": relObjs.pageObj.message, "title": relObjs.pageObj.title, "time": relObjs.pageObj.time}
        )
    },
    getAdminDisplayName: function(userId) {
        for (let user in users.admins) {
            if (users.admins[user].id === userId) {
                return users.admins[user].displayName;
            }
        }
        return "Mo and Nate"
    }
}

export default ComicPageAPI