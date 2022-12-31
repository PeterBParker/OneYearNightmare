from uuid import uuid4
import addPage as api

def main():
    data = api.getData(api._DATA_FILENAME, "r")
    last_page = None
    curr_page = None
    for season in data["seasons"]:
        for chapter in season["chapters"]:
            for page in chapter["pages"]:
                curr_page = page
                curr_page["prevPageUuid"] = None
                if last_page:
                    last_page["nextPageUuid"] = curr_page["uuid"]
                    curr_page["prevPageUuid"] = last_page["uuid"]
                last_page=curr_page
    # Set last page's next to null
    curr_page["nextPageUuid"] = None

    api.writeToFile(data, api._DATA_FILENAME)

if __name__ == "__main__":
    main()