
const ComicPageAPI = {
    pages: [
        { pageNum: 1, filename: "1.jpeg", season: "prologue" },
        { pageNum: 2, filename: "2.jpeg", season: "prologue" },
        { pageNum: 3, filename: "3.jpeg", season: "prologue" },
        { pageNum: 4, filename: "4.jpeg", season: "prologue" },
        { pageNum: 1, filename: "5.jpeg", season: "spring" },
    ],
    all: function () { return this.pages },
    get: function (id, season) {
        // isPage is a function that tests a input value against id. By passing that into find() 
        // it runs isPage() on every element in the array and the first one that returns true gets returned.
        const isPage = p => p.pageNum === id && p.season === season;
        return this.pages.find(isPage)
    }
}

export default ComicPageAPI