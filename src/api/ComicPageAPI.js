// TODO Look into loading this object from a JSON file. This would hypothetically allow me to write
// a dashboard/script to add pages for us automatically. I could also automate Main.js's COMIC_VIEWER_DEFAULT_PATH
// by grabbing the latest season/latest chapter/latest page
const ComicPageAPI = {
    seasons: [
        {
            seasonName: "Prologue",
            folderName: "prologue",
            order: 1,
            chapters: [
                {
                    chapterName: "Chapter One",
                    folderName: "chapter1",
                    order: 1,
                    pages: [
                        { pageNum: 1, filename: "1.jpeg" },
                        { pageNum: 2, filename: "2.jpg" },
                    ]
                },
                {
                    chapterName: "Chapter Two",
                    folderName: "chapter2",
                    order: 2,
                    pages: [
                        { pageNum: 1, filename: "3.jpg" },
                        { pageNum: 2, filename: "4.jpg" }
                    ]
                }
            ]
        },
        {
            seasonName: "Spring",
            folderName: "spring",
            order: 2,
            chapters: [
                {
                    chapterName: "Chapter One",
                    folderName: "chapter1",
                    order: 1,
                    pages: [
                        { pageNum: 1, filename: "5.jpg" }
                    ]
                },
            ]
        },
    ],
    getPage: function (pageNum, chapterName, seasonName) {
        const releventObjs = this.getRelValidObjs(pageNum, chapterName, seasonName);
        if (releventObjs) {
            return { "season": releventObjs.seasonObj.folderName, "chapter": releventObjs.chapterObj.folderName, "page": releventObjs.pageObj.filename};
        }
        return null;
    },
    getPrevPage: function (pageNum, chapterName, seasonName) {
        // FOR SOME REASON THIS FUNCTION TURNS MY FALSE INTO TRUE WHY???
        return this.getAdjacentPagePath(pageNum, chapterName, seasonName, false);
    },
    getNextPage(pageNum, chapterName, seasonName) {
        return this.getAdjacentPagePath(pageNum, chapterName, seasonName, true);
    },
    getAdjacentPagePath(pageNum, chapterName, seasonName, isNext) {
        const chapterInfo = this.getChapterInfo(chapterName, seasonName);
        const pageInfo = this.getAdjacentPageInfo(pageNum, chapterInfo.chapterObj, seasonName, isNext);
        if(pageInfo) {
            return {"season" : pageInfo.seasonObj.seasonName, "chapter": pageInfo.chapterObj.chapterName, "page": pageInfo.pageObj.page};
        } else {
            return null;
        }     
    },
    getAdjacentPageInfo: function (id, chapterObj, seasonName, isNext) {
        var nextPageNum = id + 1;
        if (!isNext) {
            nextPageNum = id - 1;
        }
        console.log("this is the npn", nextPageNum);
        const pageAddressObj = this.getPage(nextPageNum, chapterObj.chapterName, seasonName);    
        if (pageAddressObj) {
            //The page exists and we return an object specifying its address
            return {"seasonObj": this.getSeason(this.seasons, seasonName), "chapterObj": chapterObj, "pageObj": pageAddressObj};
        } else {
            //Get an adjacent chapter, and if isNext then return the first page in 
            //that chapter and if not isNext return the last page in that chapter
            try {
                // !!! TODO FIX THIS FUNCTION CALL !!!
                const chapterAndItsSeason = this.getAdjacentChapter(seasonName, chapterObj.chapterName, isNext);
                const targetChapterObj = chapterAndItsSeason.chapterObj;
                const targetSeasonObj = chapterAndItsSeason.seasonObj;
                if (targetChapterObj) {
                    // If the user is requesting the next page, then we will return the first page of the new chapter object
                    // else they are going back and we will return the last page of the chapter.
                    let targetPage = {};
                    if (isNext) {
                        targetPage = this.getPage(1, targetChapterObj.chapterName, seasonName);
                    } else {
                        let lastPageInChapter = this.getLastPageInChapter(targetChapterObj);
                        targetPage = this.getPage(lastPageInChapter, targetChapterObj.chapterName, seasonName);
                    }
                    if (targetPage) {
                        return {"pageObj": targetPage, "chapterObj": targetChapterObj, "seasonObj": targetSeasonObj};
                    }
                }
                // return nothing. This means there is no adjacent chapter/page. 
                // Should only happen if only a single page is uploaded and somehow a Link is rendered.
                return null
            }
            catch (err) {
                //handle errors here
            }


        }
    },
    getAdjacentChapter: function (seasonName, chapterName, isNext) {
        let chapters = this.getChaptersInSeason(seasonName);
        
        let currChapterOrder = this.getChapterOrder(chapters, chapterName);
        let targetChapterOrder = currChapterOrder - 1;
        if (isNext) {
            targetChapterOrder = currChapterOrder + 1;
        }
        var targetChapterObj = this.getChapter(chapters, targetChapterOrder, seasonName);
        if (targetChapterObj == null) {
            //we are crossing between seasons. We need to get the previous or next season depending on isNext
            let currSeasonOrder = this.getSeasonOrder(seasonName);
            let targetSeasonOrder = -1;
            if (isNext) {
                targetSeasonOrder = currSeasonOrder + 1;
            } else {
                targetSeasonOrder = currSeasonOrder - 1;
            }
            if (!this.isValidSeasonOrder(targetSeasonOrder)) {
                // There is no previous or next season. Throw error or return null
            } else {
                // If it is a valid season, then we want to get the first chapter if isNext and the last chapter
                // if not isNext
                try {
                    let targetSeasonObj = this.getSeasonNameFromOrder(targetSeasonOrder);
                    if (isNext) {
                        targetChapterObj = this.getFirstChapterInSeason(targetSeasonObj.seasonName);
                    } else {
                        targetChapterObj = this.getLastChapterInSeason(targetSeasonObj.seasonName);
                    }
                    return {"chapterObj": targetChapterObj, "seasonObj": targetSeasonObj};
                }
                catch (err) {
                    //handle error
                }

            }

        } else {
            return {"chapterObj": targetChapterObj, "seasonObj": this.getSeason(this.seasons, seasonName)}
        }
    },
    getSeasonNameFromOrder: function (seasonOrder) {
        if (!this.isValidSeasonOrder(seasonOrder)) {
            return null;
        }
        const isSeason = p => p.order === seasonOrder;
        let seasonObj = this.seasons.find(isSeason);
        if (seasonObj == null) {
            //throw error. something is wrong.
            throw("Invalid season data")
        }
        return seasonObj.seasonName;
    },
    getFirstChapterInSeason: function (seasonName) {
        let seasonObj = this.getSeason(this.seasons, seasonName);
        return this.getChapter(seasonObj.chapters, 1, seasonName);
    },
    getLastChapterInSeason: function (seasonName) {
        let seasonObj = this.getSeason(this.seasons, seasonName);
        let lastChapNum = this.getLastChapterInSeason(seasonName);
        return this.getChapter(seasonObj.chapters, lastChapNum, seasonName);
    },
    getLastSeasonNum: function () {
        let lastSeasonNum = -1;
        for (var seasonIndex in this.seasons) {
            let season = this.seasons[seasonIndex];
            if (season.order > lastSeasonNum) {
                lastSeasonNum = season.order;
            }
        }
        return lastSeasonNum;
    },
    getLastPageInChapter: function (chapterObj) {
        var lastPageNum = -1;
        for (var pageIndex in chapterObj.pages) {
            let page = chapterObj.pages[pageIndex];
            if (page.pageNum != null && page.pageNum > lastPageNum) {
                lastPageNum = page.pageNum;
            }
        }
        return lastPageNum;
    },
    getChaptersInSeason: function (seasonName) {
        const isSeason = p => p.seasonName == seasonName;
        let seasonObj = this.seasons.find(isSeason);
        if (seasonObj == null) {
            //return error about invalid seasonName
            throw("Invalid season data regarding season: ", seasonName);
        }
        return seasonObj.chapters;
    },
    getChapter: function (chapters, chapterOrder, seasonName) {
        {/* This function gets a chapter based on its order.

            Parameters:
            chapterOrder - an integer that represents the current chapter's order in the story
            chapters - a list of chapter objects 
         */}
        let seasonObj = this.getSeason(this.seasons, seasonName);
        if (seasonObj == null) {
            //throw error about invalid seasonName
        }
        const isChapter = p => p.order === chapterOrder;
        return chapters.find(isChapter);
    },
    getChapterInfo(chapterName, seasonName) {
        let chapters = this.getChaptersInSeason(seasonName);
        let chapterOrder = this.getChapterOrder(chapters, chapterName);
        let chapterObj = this.getChapter(chapters, chapterOrder, seasonName);
        return {"chapters": chapters, "chapterOrder": chapterOrder, "chapterObj": chapterObj};
    },
    getChapterOrder: function (chapters, chapterName) {
        const isChapter = p => p.chapterName == chapterName;
        let chapterObj = chapters.find(isChapter);
        if (chapterObj) {
            return chapterObj.order;
        } else {
            return null;
        }
    },
    getSeason: function (seasons, seasonName) {
        {/* This function gets a season object
        
            Parameters:
            seasons - an array of season objects
            seasonName - a string of the season name
        */}
        const isSeason = p => p.seasonName == seasonName;
        return seasons.find(isSeason);
    },
    getSeasonOrder: function (seasonName) {
        const isSeason = p => p.seasonName == seasonName;
        return this.seasons.find(isSeason);
    },
    getRelValidObjs: function (id, chapterName, seasonName) {
        {/* This function checks if the page address is valid, and if so
            it returns the relevent Season object, Chapter object, and Page object.

            Parameters:
            id - And integer of the page number 
            chapter - A string of the chapter name
            season - A string of the season name        
        */}

        let validObjs = {}
        const seasonObj = this.getSeason(this.seasons, seasonName);
        
        if (seasonObj) {
            validObjs.seasonObj = seasonObj;
            const chapterOrder = this.getChapterOrder(seasonObj.chapters, chapterName);
            
            const chapterObj = this.getChapter(seasonObj.chapters, chapterOrder, seasonName);
            
            if (chapterObj) {
                validObjs.chapterObj = chapterObj;
                const pageObj = this.findPage(chapterObj, id);
                if (pageObj) {
                    validObjs.pageObj = pageObj;
                    return validObjs;
                }
            }
        }
        return null;
    },
    getPageNum: function (pageFilename, chapterName, seasonName) {
        if(this.isPageFilenameValid(pageFilename)) {
            let seasonObj = this.getSeason(this.seasons, seasonName);
            let chapterObj = this.getChapter(seasonObj.chapters, this.getChapterOrder(seasonObj.chapters, chapterName), seasonName);
            const isPage = p => p.filename == pageFilename;
            const pageObj =  chapterObj.pages.find(isPage);
            if(pageObj == null) {
                return null
            }
            return pageObj.pageNum;
        } else {
            // invalid url. Get the Comic Viewer to render "No Page Found"
            return null;
        }
        
    },
    isPageFilenameValid: function (pageFilename) {
        //
        const pages = this.getAllPages();
        const matchingPage = p => p.filename == pageFilename;
        if(pages.find(matchingPage)) {
            return true;
        } else {
            return false;
        }
    },
    getAllPages: function() {
        let pages = [];
        try {
            for(var seasonIndex in this.seasons) {
                const chapters = this.getChaptersInSeason(this.seasons[seasonIndex].seasonName);
                for(var chapterIndex in chapters) {
                    chapters[chapterIndex].pages.forEach(p => pages.push(p));
                }
            }
        }
        catch(err) {
            throw(err);
        }
        return pages;        
    },
    findPage: function (chapterObj, pageNum) {
        {/* Given a chapter object and page number, this function will 
        return that page's obj */}
        const isPage = p => p.pageNum === pageNum;
        return chapterObj.pages.find(isPage);
    },
    isValidSeasonOrder(seasonOrder) {
        let maxSeasonNum = this.getLastSeasonNum();
        if (seasonOrder <= maxSeasonNum && seasonOrder >= 1) {
            return true;
        }
        return false;
    }

}

export default ComicPageAPI