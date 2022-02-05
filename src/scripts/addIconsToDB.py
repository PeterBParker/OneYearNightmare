from operator import add
import addPage as api
import os


def main():
    data = api.getData(api._DATA_FILENAME, "r")
    for season in data["seasons"]:
        for chapter in season["chapters"]:
            for page in chapter["pages"]:
                page["icon"] = (
                    "icons/" + os.path.splitext(page["filename"])[0] + "-Icon.png"
                )
    api.writeToFile(data, api._DATA_FILENAME)


if __name__ == "__main__":
    main()
