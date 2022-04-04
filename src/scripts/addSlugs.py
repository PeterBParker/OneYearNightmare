from uuid import uuid4
import addPage as api

def main():
    data = api.getData(api._DATA_FILENAME, "r")
    for season in data["seasons"]:
        for chapter in season["chapters"]:
            for page in chapter["pages"]:
                page["page_uuid"] = str(uuid4())
    api.writeToFile(data, api._DATA_FILENAME)

if __name__ == "__main__":
    main()