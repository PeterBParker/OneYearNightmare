import datetime
import json
import ntpath
import os

from IconMaker import IconMaker
from pathlib import Path
from shutil import copyfile
from num2words import num2words
from uuid import uuid4

# Future TODO: Rewrite this in javascript and use the data API instead of declaring new functions.
# TODO:         Delete folders if the program crashes? idk.
class PageManager():
    _DATA_FILENAME = "../api/data/pagesData.json"
    _USERS_FILENAME = "../api/data/users.json"
    _WORKING_DATA_FILENAME = "../api/data/pagesData-temp.json"
    _BACKUP_FILENAME = "../api/data/pagesData-backup.json"
    _DIR_PREFIX = "../../public/MnMPages/"
    _ICON_REL_DIR = "icons"  # The directory to save icons in relative to the chapter dir
    _PAGE_ADDED_SUCCESS = "Page successfully added!"


    def __init__(self):
        self._ACTION_HANDLERS = {
            "append": self.append_handler,
            "insert": self.insert_handler
        }

    def add_chapter(self, season_name, chapter_name, folderName, numOfPages, id, pages):
        chapter_obj = {
            "chapterName": chapter_name,
            "folderName": folderName,
            "numOfPages": numOfPages,
            "id": id,
            "pages": pages,
        }
        self.write_chapter_append(chapter_obj, season_name)
        season = self.get_season(season_name)
        self.make_directory(self._DIR_PREFIX + season["folderName"] + "/" + folderName)


    def add_first_chapter(self, season_name):
        self.add_chapter(
            season_name=season_name,
            chapter_name="Chapter One",
            folderName="chapter1",
            numOfPages=0,
            id=1,
            pages=[],
        )


    def generate_thumbnail(self, image_path):
        """Generates a thumbnail and saves it to the icon dir.

        :param image_path(pathlib.Path): path to target image to iconify
        """
        iconer = IconMaker()
        icon_path = image_path.parent / self._ICON_REL_DIR / iconer.getIconName(image_path)
        icon_path.parent.mkdir(exist_ok=True)
        iconer.iconify_file((200, 200), image_path, icon_path)
        return icon_path


    def addAnIconPathToDb(self, db_filename, icon_path, page_id):
        """Adds the path of an icon to the db json file.

        :param db_filename(pathlib.Path): Absolute path to db file
        :param icon_path(pathlib.Path): Absolute path to icon
        :param page_id(int): Unique id of page
        """
        data = self.get_data(db_filename, "r")
        chapter_dir = icon_path.parent.parent
        season_dir = chapter_dir.parent
        season = next(
            season for season in data["seasons"] if season["folderName"] == season_dir.name
        )
        chapter = next(
            chapter
            for chapter in season["chapters"]
            if chapter["folderName"] == chapter_dir.name
        )
        page = next(page for page in chapter["pages"] if page["id"] == page_id)
        page["icon"] == str(Path(self._ICON_REL_DIR) / icon_path.name)
        self.write_to_file(data, db_filename)

    def copy_page_assets(self, filepath, season, chapter):
        # Copy image and truncate filename
        filename = self.path_leaf(filepath)
        destDir = Path(
            self._DIR_PREFIX + season["folderName"] + "/" + chapter["folderName"] + "/"
        )
        destFilepath = destDir / filename
        copyfile(filepath, destFilepath)

        # Generate icon and add it to db
        icon_path = self.generate_thumbnail(destFilepath)
        return filename, icon_path

    def create_new_page_data(self, new_page_num, filename, icon_path, title, message, user, next_page_uuid, prev_page_uuid):
        new_page_uuid = str(uuid4())
        time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        new_page = {
            "pageNum": new_page_num,
            "filename": filename,
            "title": title,
            "message": message,
            "datetime": time,
            "user": user,
            "icon": str((Path(self._ICON_REL_DIR) / icon_path.name).as_posix()),
            "uuid": new_page_uuid,
            "nextPageUuid": next_page_uuid,
            "prevPageUuid": prev_page_uuid
        }
        return new_page


    def append_new_page(self, season_name, chapter_name, title, message, filepath, user):
        chapter = self.get_chapter_in_season(season_name, chapter_name)
        season = self.get_season(season_name)
        latest_page = self.get_latest_page()

        filename, icon_path = self.copy_page_assets(filepath, season, chapter)
        print(f"Added icon to {icon_path}")
        new_page_num = chapter["numOfPages"] + 1
        new_page_data = self.create_new_page_data(new_page_num, filename, icon_path, title, message, user, None, latest_page["uuid"])

        self.write_latest_page_next_page(new_page_data["uuid"])
        self.write_increment_chapter_page_count(season["id"], chapter["id"])
        self.write_increment_season_page(season["id"])
        self.write_increment_book_page_count()
        self.write_new_max_display_page(new_page_data["uuid"])
        

        self.write_page_append(season["id"], chapter["id"], new_page_data)

        return True


    def append_season(self):
        newSeasonName = self.enter_season_name()
        seasonObj = {}
        seasonObj["seasonName"] = newSeasonName
        if not os.path.exists(
            "../../public/OneYearNightmarePages/" + newSeasonName.lower()
        ):
            os.makedirs(self._DIR_PREFIX + newSeasonName.lower())
        else:
            raise Exception("Season directory already exists for specified season.")
        seasonObj["folderName"] = newSeasonName.lower()
        seasonObj["numOfPages"] = 0
        seasonObj["numOfChapters"] = 0
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        seasonObj["id"] = data["seasonCount"] + 1
        seasonObj["chapters"] = []

        # This function has to come first to create the season the chapter is added to.
        self.write_new_season_append(seasonObj)
        self.add_first_chapter(newSeasonName)
        self.write_increment_season_count()

        return newSeasonName


    def create_new_chapter(self, season_name):
        season = self.get_season(season_name)

        chapterNum = season["numOfChapters"]
        chapter_name = "Chapter " + num2words(chapterNum).capitalize()

        # Make folder
        folderName = "chapter" + str(chapterNum)
        self.make_directory(self._DIR_PREFIX + season["folderName"] + "/" + folderName)
        lastChapName = self.get_last_chapter_name_in_season(season_name)
        lastChap = self.get_chapter_in_season(season_name, lastChapName)
        self.add_chapter(season_name, chapter_name, folderName, 0, lastChap["id"]+1, [])
        return chapter_name


    def does_season_exist(self, season_name):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        for season in data["seasons"]:
            if season_name.lower() == season["seasonName"].lower():
                return True
        return False


    def get_data(self, filename, r_or_w):
        with open(filename, r_or_w, encoding="utf-8") as dataFile:
            data = json.load(dataFile)
        return data


    def get_chapter_in_season(self, season_name, chapter_name):
        seasonObj = self.get_season(season_name)
        for chapter in seasonObj["chapters"]:
            if chapter["chapterName"] == chapter_name:
                return chapter
        return None


    def get_last_chapter_name_in_season(self, season_name):
        seasonObj = self.get_season(season_name)
        chapterIndex = seasonObj["numOfChapters"] - 1
        lastChapterObj = seasonObj["chapters"][chapterIndex]
        return lastChapterObj["chapterName"]


    def get_latest_season(self):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        if len(data["seasons"]) == 0:
            return None
        latestSeason = max(data["seasons"], key=lambda x: x["id"])
        return latestSeason

    def get_latest_season_with_content(self):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        if len(data["seasons"]) == 0:
            return None

        def season_content_filter(x):
            chapters = x.get("chapters")
            if len(chapters) > 0:
                if len(chapters[0].get("pages")) > 0:
                    return True
            return False
        latestSeason = max(filter(season_content_filter, data["seasons"]), key=lambda x: x["id"])
        return latestSeason

    def get_latest_chapter_with_content(self):
        latestSeason = self.get_latest_season_with_content()
        if latestSeason is not None:
            # Of all the chapters that have pages, get the one with the highest id
            latestChapter = max(filter(lambda x: len(x.get("pages")), latestSeason["chapters"]), key=lambda x: x["id"])
            return latestChapter
        else:
            return None

    def get_latest_page(self):
        latestChapter = self.get_latest_chapter_with_content()
        if latestChapter is not None:
            latestPage = max(latestChapter["pages"], key=lambda x: x["pageNum"])
            return latestPage
        else:
            return None

    def get_latest_season_name(self):
        latestSeason = self.get_latest_season()
        if latestSeason is None:
            return None
        return latestSeason["seasonName"]


    def get_season(self, season_name):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        for season in data["seasons"]:
            if season_name == season["seasonName"]:
                return season
        raise Exception("Season not found")


    def get_season_index(self, season_name):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        for season in data["seasons"]:
            if season_name == season["seasonName"]:
                return season["id"] - 1
        raise Exception("Season not found")


    def get_target_chapter(self, season_name):
        return self.enter_new_or_existing_chapter(season_name)

    def get_target_season(self):
        targetSeason = None
        while True:
            latestSeasonName = self.get_latest_season_name()
            if latestSeasonName is None:
                print("\nNo seasons found. Please create a season.\n")
                targetSeason = self.append_season()
                continue
            print(
                "\nPlease select an option:\n1) Append to "
                + latestSeasonName
                + "\n2) Add a new season\n"
            )
            selection = input("> ")
            if selection == "1":
                targetSeason = latestSeasonName
                break
            elif selection == "2":
                targetSeason = self.append_season()
            else:
                print("\nI don't recognize that option. Try again.\n")
        return targetSeason


    def get_user(self):
        userData = self.get_data(self._USERS_FILENAME, "r")
        usernames = []
        for person in userData["admins"]:
            usernames.append(person["id"])
        user = None
        while True:
            # Ask for user
            print("Who is adding this page?")
            print("Legal values are: ")
            for name in usernames:
                print(name)

            # Get input
            user = input("> ")

            # Validate it matches one of the users allowed
            if user in usernames:
                return user
            else:
                print("That id doesn't match any known user :(")
                continue


    def enter_season_name(self):
        decidingOnSeasonName = True
        newSeasonName = None
        while decidingOnSeasonName:
            print("\nAdding a Season! Please enter the name of the new season:\n")
            newSeasonName = input("Enter New Season Name > ")
            if self.does_season_exist(newSeasonName):
                print("Season already exists! Please add a different season.\n")
                continue
            print("\nConfirm you want to add the season, " + newSeasonName + "\n")
            confirmation = input("y/n > ")
            if confirmation == "y":
                decidingOnSeasonName = False
        return newSeasonName


    def enter_new_or_existing_chapter(self, season_name):
        while True:
            lastChapterName = self.get_last_chapter_name_in_season(season_name)
            print(
                "\nPlease select an option:\n1) Append to "
                + season_name
                + ", "
                + lastChapterName
                + "\n2) Create a new chapter?\n"
            )
            appendOrCreate = input("> ")
            if appendOrCreate == "1":
                break
            elif appendOrCreate == "2":
                lastChapterName = self.create_new_chapter(season_name)
                break
        return lastChapterName


    def enter_page_data(self, season_name, chapter_name):
        # user needs to input filename, message, and title
        title = None
        message = None
        filepath = None
        while True:
            print("\nPlease type the title for this page:\n")
            title = input("> ")
            print("\nPlease type the message for this page:\n")
            message = input("> ")
            while True:
                print("\nPlease type the absolute filepath for this page:\n")
                filepath = input("> ")
                if os.path.exists(filepath):
                    break
                else:
                    print(
                        "\nThat filepath cannot be found. Check your file extensions, path, and try again."
                    )
            print(
                "\nConfirm you want to add a page with these details:\n\
                                - Adding to "
                + season_name
                + ", "
                + chapter_name
                + "\n\
                                - Title: "
                + title
                + "\n\
                                - Filepath: "
                + filepath
                + "\n\
                                - Message: "
                + message
                + "\n"
            )
            redo = input("y/n > ")
            if redo == "y":
                break
        return title, message, filepath


    def make_directory(self, dirpath):
        if not os.path.exists(dirpath):
            os.makedirs(dirpath)
        else:
            # Check if the directory is empty or not. We don't want to overwrite data.
            if len(os.listdir(dirpath)) != 0:
                raise Exception("Directory already exists")

    def path_leaf(self, path):
        head, tail = ntpath.split(path)
        return tail or ntpath.basename(head)


    def safe_copy_file(self, filename, dest):
        if os.path.exists(filename):
            copyfile(filename, dest)
            return self._WORKING_DATA_FILENAME
        else:
            raise FileNotFoundError("No Data File Found")


    def write_chapter_append(self, chapterObj, season_name):

        data = self.get_data(self._WORKING_DATA_FILENAME, "r")

        seasonObj = self.get_season(season_name)
        seasonObj["chapters"].append(chapterObj)
        seasonObj["numOfChapters"] += 1
        seasonIndex = seasonObj["id"] - 1
        # Replace the proper season object with our newly created one.
        data["seasons"][seasonIndex] = seasonObj

        self.write_to_file(data, self._WORKING_DATA_FILENAME)


    def write_relink_page_pointers(self, first_page_id, middle_page_id, last_page_id):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        for season in data.get("seasons"):
            for chapter in season.get("chapters"):
                for page in chapter.get("pages"):
                    if page.get("uuid") == first_page_id:
                        page["nextPageUuid"] = middle_page_id
                    elif page.get("uuid") == middle_page_id:
                        page["prevPageUuid"] = first_page_id
                        page["nextPageUuid"] = last_page_id
                    elif page.get("uuid") == last_page_id:
                        page["prevPageUuid"] = middle_page_id
        self.write_to_file(data, self._WORKING_DATA_FILENAME)


    def write_latest_page_next_page(self, new_next_page_uuid):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        lastPage = None
        # I iterate through all pages in case there is a new chapter or season that doesn't have any pages
        for season in data["seasons"]:
            for chapter in season["chapters"]:
                for page in chapter["pages"]:
                    lastPage = page
        
        lastPage["nextPageUuid"] = new_next_page_uuid
        self.write_to_file(data, self._WORKING_DATA_FILENAME)


    def write_increment_book_page_count(self):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        data["pageCount"] += 1
        self.write_to_file(data, self._WORKING_DATA_FILENAME)


    def write_increment_season_count(self):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        data["seasonCount"] += 1
        self.write_to_file(data, self._WORKING_DATA_FILENAME)


    def write_increment_chapter_page_count(self, seasonId, chapterId):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        data["seasons"][seasonId - 1]["chapters"][chapterId - 1]["numOfPages"] += 1
        self.write_to_file(data, self._WORKING_DATA_FILENAME)


    def writeNewSeasonOverwrite(self, seasonObj, seasonIndex):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        data["seasons"][seasonIndex] = seasonObj
        self.write_to_file(data, self._WORKING_DATA_FILENAME)

    def write_new_max_display_page(self, new_page_id):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        data["maxDisplayPage"] = new_page_id
        self.write_to_file(data, self._WORKING_DATA_FILENAME)

    def write_new_season_append(self, seasonObj):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        data["seasons"].append(seasonObj)
        self.write_to_file(data, self._WORKING_DATA_FILENAME)


    def write_page_append(self, seasonId, chapterId, newPage):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        data["seasons"][seasonId - 1]["chapters"][chapterId - 1]["pages"].append(newPage)
        self.write_to_file(data, self._WORKING_DATA_FILENAME)


    def write_increment_season_page(self, seasonId):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        data["seasons"][seasonId - 1]["numOfPages"] += 1
        self.write_to_file(data, self._WORKING_DATA_FILENAME)

    def write_page_insert(self, season_index: int, chapter_index: int, page_index: int, new_page_data: dict):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        season = data.get("seasons")[season_index]
        chapter = season.get("chapters")[chapter_index]
        chapter.get("pages").insert(page_index, new_page_data)

        # Recalculate the pageNums starting at the page that was displaced
        for page_index in range(page_index+1, len(chapter.get("pages"))):
            page = chapter.get("pages")[page_index]
            page["pageNum"] += 1
        
        self.write_to_file(data, self._WORKING_DATA_FILENAME)


    def write_to_file(self, data, filename):
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
            f.truncate()


    def append_handler(self):
        user = self.get_user()
        # Get Season Name to add the page to
        season_name = self.get_target_season()

        # Get Chapter Name to add the page to
        chapter_name = self.get_target_chapter(season_name)

        # Get Page Data
        title, message, filepath = self.enter_page_data(season_name, chapter_name)

        print("Adding page...")
        is_success = self.append_new_page(season_name, chapter_name, title, message, filepath, user)
        if is_success:
            print(self._PAGE_ADDED_SUCCESS)
            # Overwrite data file with temp file
            copyfile(self._WORKING_DATA_FILENAME, self._DATA_FILENAME)


    def get_insert_location(self):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        while True:
            print("Please provide the uuid of the pre-existing page you want to follow the page you want to insert:")
            uuid = input("> ")
            print("Searching for that page...")
            for season_index in range(0, len(data["seasons"])):
                season = data["seasons"][season_index]
                for chapter_index in range(0, len(season["chapters"])):
                    chapter = season["chapters"][chapter_index]
                    for page_index in range(0, len(chapter["pages"])):
                        page = chapter["pages"][page_index]
                        if uuid == page["uuid"]:
                            # Confirm location
                            print(f"Page found! I will insert your new page immediately BEFORE:\n"
                                    f"{chapter['chapterName']} - {page['title']} (the current page {page['pageNum']} in the chapter)")
                            print("Is this correct? (y/n)")
                            confirmation = input("> ")
                            if confirmation.lower() == "y":
                                return {
                                    "season_index": season_index,
                                    "chapter_index": chapter_index,
                                    "page_index": page_index
                                }
            print("Cannot find a page with that uuid. Please try again.")

    def insert_new_page(self, season_index, chapter_index, page_index, title, message, filepath, user):
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        season = data["seasons"][season_index]
        chapter = season["chapters"][chapter_index]

        # Get the uuid of the reference page
        try:
            new_next_page_uuid = data.get("seasons")[season_index].get("chapters")[chapter_index].get("pages")[page_index].get("uuid")
        except (IndexError, KeyError):
            print("Error: Can't find the page to insert behind. Quitting...")
            return False
        
        # Get the uuid of the page preceding the new next page
        try:
            new_prev_page_uuid = data.get("seasons")[season_index].get("chapters")[chapter_index].get("pages")[page_index].get("prevPageUuid")
        except (IndexError, KeyError):
            print("Error: Can't find the page to insert after. Quitting...")
            return False

        filename, icon_path = self.copy_page_assets(filepath, season, chapter)
        # set the num page number equal to the page number of the reference page and 
        # correct the following pages in the write function
        new_page_num = chapter.get("pages")[page_index].get("pageNum")
        new_page_data = self.create_new_page_data(new_page_num, filename, icon_path, title, message, user, new_next_page_uuid, new_prev_page_uuid)

        self.write_relink_page_pointers(new_prev_page_uuid, new_page_data["uuid"], new_next_page_uuid)
        self.write_increment_chapter_page_count(season["id"], chapter["id"])
        self.write_increment_season_page(season["id"])
        self.write_increment_book_page_count()
        self.write_page_insert(season_index, chapter_index, page_index, new_page_data)
        self.write_new_max_display_page(new_page_data["uuid"])

        return True

    def insert_handler(self):
        user = self.get_user()

        # This is the location of an existing page to insert the page BEFORE
        insert_location = self.get_insert_location()

        # Get Page Data
        data = self.get_data(self._WORKING_DATA_FILENAME, "r")
        season_name = data["seasons"][insert_location["season_index"]]["seasonName"]
        chapter_name = data["seasons"][insert_location["season_index"]]["chapters"][insert_location["chapter_index"]]["chapterName"]
        title, message, filepath = self.enter_page_data(season_name, chapter_name)

        # Insert Page
        is_success = self.insert_new_page(
            season_index=insert_location["season_index"],
            chapter_index=insert_location["chapter_index"],
            page_index=insert_location["page_index"],
            title=title,
            message=message,
            filepath=filepath,
            user=user
        )
        if is_success:
            print(self._PAGE_ADDED_SUCCESS)
            # Overwrite data file with temp file
            copyfile(self._WORKING_DATA_FILENAME, self._DATA_FILENAME)


    def get_action(self):
        while True:
            print("What action would you like to do?")
            for key in self._ACTION_HANDLERS:
                print(f"• {key}")
            action = input("> ")
            if action not in self._ACTION_HANDLERS:
                print("Please enter a valid action.")
            else:
                return action

    def run_interface(self):
        try:
            # Make a backup of the data in case something goes wrong in the script
            self.safe_copy_file(self._DATA_FILENAME, self._BACKUP_FILENAME)

            # Make a copy of the data file to make intermediate changes to
            working_data_file_name = self.safe_copy_file(self._DATA_FILENAME, self._WORKING_DATA_FILENAME)

            print(
                "Welcome to the Page Content Manager! I will append or insert a page to the end of a specifed chapter.\n"
            )

            action = self.get_action() # make sure this checks if the action is valid

            self._ACTION_HANDLERS[action]()
            print("Exiting...")
        finally:
            os.remove(working_data_file_name)


if __name__ == "__main__":
    p_manager = PageManager()
    p_manager.run_interface()