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
    getPage: function (id, chapter, season) {
        if (this.isValidPage(id, chapter, season)) {
            const seasonObj = this.findSeason(season);
            const chapterObj = this.findChapter(seasonObj, chapter);
            const pageObj = this.findPage(chapterObj, id);
            return { "season": seasonObj.folderName, "chapter": chapterObj.folderName, "page": pageObj.filename};
        }
        return null;
    },
    getNextPage: function (id, chapter, season) {

    },
    getPrevPage: function (id, chapter, season) {

    },
    hasNextPage: function (id, chapter, season) {

    },
    hasPrevPage: function (id, chapter, season) {

    },
    isValidPage: function (id, chapter, season) {
        const seasonObj = this.findSeason(season);
        if(seasonObj){
            const chapterObj = this.findChapter(seasonObj, chapter);
            if(chapterObj) {
                const pageObj = this.findPage(chapterObj, id);
                if(pageObj) {
                    return true;
                }
            }
        }
        return false;
    },
    findSeason: function (season) {
        {/* Given a season name, this function will return that season's obj */}
        const isSeason = p => p.seasonName === season;
        return this.seasons.find(isSeason);
    },
    findChapter: function (seasonObj, chapter) {
        {/* Given a season object and chapter name, this function will 
        return that chapter's obj */}
        const isChapter = p => p.chapterName === chapter;
        return seasonObj.chapters.find(isChapter);
    },
    findPage: function (chapterObj, pageNum) {
        {/* Given a chapter object and page number, this function will 
        return that page's obj */}
        const isPage = p => p.pageNum === pageNum;
        return chapterObj.pages.find(isPage);
    }

}

export default ComicPageAPI