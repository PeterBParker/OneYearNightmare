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
    getPage: function (id, chapterName, seasonName) {
        const releventObjs = this.getRelValidObjs(id, chapterName, seasonName);
        if (releventObjs) {
            return { "season": releventObjs.seasonObj.folderName, "chapter": releventObjs.chapterObj.folderName, "page": releventObjs.pageObj.filename };
        }
        return null;
    },
    getPrevPage: function (id, chapterName, seasonName) {
        return this.getAdjacentPagePath(id, chapterName, seasonName, false);
    },
    getNextPage(id, chapterName, seasonName) {
        return this.getAdjacentPagePath(id, chapterName, seasonName, true);
    },
    getAdjacentPagePath(id, chapterName, seasonName, isNext) {
        const chapterInfo = this.getChapterInfo(chapterName, seasonName);
        const pageInfo = this.getAdjacentPageInfo(id, chapterInfo.chapterObj, seasonName, isNext);
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
        let targetChapter = this.getChapter(chapters, targetChapterOrder, seasonName);
        if (targetChapter == null) {
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
                    let targetChapterObj = {};
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
        for (var season in this.seasons) {
            if (season.order > lastSeasonNum) {
                lastSeasonNum = season.order;
            }
        }
        return lastSeasonNum;
    },
    getLastPageInChapter: function (chapterObj) {
        var lastPageNum = -1;
        for (var page in chapterObj.pages) {
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