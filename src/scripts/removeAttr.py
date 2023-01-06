from addPage import PageManager
import sys

def main(attribute):
    """ Creates a mapping of each page to its address in the object. Writes this to the main object

    Must be run before every deployment to ensure the index object is up-to-date.
    """
    api = PageManager()
    data = api.get_data(api._DATA_FILENAME, "r")
    for seasonIndex in range(0, len(data["seasons"])):
        season = data["seasons"][seasonIndex]
        for chapterIndex in range(0, len(season["chapters"])):
            chapter = season["chapters"][chapterIndex]
            for pageIndex in range(0, len(chapter["pages"])):
                page = chapter["pages"][pageIndex]
                # Add global page num
                del page[attribute]
    api.write_to_file(data, api._DATA_FILENAME)

if __name__ == "__main__":
    if len(sys.argv) == 2:
        answer = input(f"This will remove the attribute {sys.argv[1]} from every page object. Are you sure? Type 'yes' to confirm")
        if answer == "yes":
            attribute = sys.argv[1]
            main(attribute)
    else:
        print("Please provide an attribute to remove.")