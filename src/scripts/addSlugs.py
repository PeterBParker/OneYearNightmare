from uuid import uuid4
from addPage import PageManager

def main():
    api = PageManager()
    data = api.get_data(api._DATA_FILENAME, "r")
    for season in data["seasons"]:
        for chapter in season["chapters"]:
            for page in chapter["pages"]:
                page["uuid"] = str(uuid4())
    api.write_to_file(data, api._DATA_FILENAME)

if __name__ == "__main__":
    main()