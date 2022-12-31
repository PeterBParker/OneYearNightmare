import addPage as api

def main():
    """ Creates a mapping of each page to its address in the object. Writes this to the main object

    Must be run before every deployment to ensure the index object is up-to-date.
    """
    data = api.getData(api._DATA_FILENAME, "r")
    index_mapping = {}
    global_page_num = 0
    for seasonIndex in range(0, len(data["seasons"])):
        season = data["seasons"][seasonIndex]
        for chapterIndex in range(0, len(season["chapters"])):
            chapter = season["chapters"][chapterIndex]
            for pageIndex in range(0, len(chapter["pages"])):
                page = chapter["pages"][pageIndex]
                # Add global page num
                page["globalPageNum"] = global_page_num
                global_page_num+=1
                # Add page address to index
                index_mapping[page["uuid"]] = {
                    "seasonIndex": seasonIndex,
                    "chapterIndex": chapterIndex,
                    "pageIndex": pageIndex
                }
    data["pageIndex"] = index_mapping
    api.writeToFile(data, api._DATA_FILENAME)

if __name__ == "__main__":
    main()