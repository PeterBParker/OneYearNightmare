import addPage as api
import os
from pathlib import Path
from PIL import Image, UnidentifiedImageError


class IconifyPagesController:
    def __init__(self, icon_suffix="-Icon.png", icon_dir=Path("icons/"), icon_dims=(200,200)):
        self.icon_suffix = icon_suffix
        self.icon_dir = icon_dir
        self.icon_dims = icon_dims

    def getIconName(self, base_page_path):
        return os.path.splitext(os.path.basename(base_page_path))[0] + self.icon_suffix

    def iconifyExistingPage(self, page_file_path, icon_dir):
        """ Saves a copy of an image as an icon. 
        
        :param page_file_path(pathlib.Path): An absolute filepath to an image
        :param icon_dir(pathlib.Path): An absolute filepath to the output dir

        :returns: path to the icon
        :rtype: pathlib.Path
        """
        icon_filename = self.getIconName(page_file_path)
        icon_path = icon_dir / icon_filename
        iconer = IconMaker()
        iconer.iconify_file(self.icon_dims, page_file_path, icon_path)
        return icon_path

    def iconifyAllExistingPages(self):
        pagesDir = Path("../../public/MnMPages/")

        for seasonDir in pagesDir.iterdir():
            for chapterDir in seasonDir.iterdir():
                icon_dir = chapterDir / "icons"
                if not os.path.isdir(icon_dir):
                    os.mkdir(icon_dir)
                for page in chapterDir.iterdir():
                    if os.path.basename(page) == "icons":
                        continue
                    self.iconifyExistingPage(page, icon_dir)

    def addAnIconPathToDb(self, db_filename, icon_path, page_id):
        """ Adds the path of an icon to the db json file.
        
        :param db_filename(pathlib.Path): Absolute path to db file
        :param icon_path(pathlib.Path): Absolute path to icon
        :param page_id(int): Unique id of page
        """
        data = api.getData(db_filename, "r")
        chapter_dir = icon_path.parent.parent
        season_dir = chapter_dir.parent
        season = next(season for season in data["seasons"] if season["foldername"] == season_dir.name)
        chapter = next(chapter for chapter in season["chapters"] if chapter["foldername"] == chapter_dir.name)
        page = next(page for page in chapter["pages"] if page["id"] == page_id)
        page["icon"] == self.icon_dir / icon_path.name
        api.writeToFile(data, db_filename)

    def addIconPathsToDb(self, db_filename):
        data = api.getData(db_filename, "r")
        for season in data["seasons"]:
            for chapter in season["chapters"]:
                for page in chapter["pages"]:
                    page["icon"] = (
                        self.icon_dir
                        + os.path.splitext(page["filename"])[0]
                        + self.icon_suffix
                    )
        api.writeToFile(data, db_filename)

    def generateAndAddIcons(self, db_filename):
        self.iconifyAllExistingPages()
        self.addIconPathsToDb(db_filename)

    def generateAndAddAIcon(self, db_filename):
        self.ic


class IconMaker:
    def iconify_file(self, dimensions, image_path, output_path):
        """Takes an image and creates a customizable icon

        :param dimensions(tuple(int,int)): The maximum desired height in pixels
        :param image_path(str): The file path for the original image
        :param output_path(str): The file path for the output icon
        """
        if self.validate_file(image_path):
            im = Image.open(image_path)
            im.thumbnail(dimensions)
            im.save(output_path)

    @staticmethod
    def validate_file(file_path):
        """Filters out the files that aren't images

        :param file_path(str): The file path of a suspected image

        :returns: Whether the file is an image or not
        :rtype: boolean
        """
        isImage = False
        try:
            if Image.open(file_path):
                isImage = True
        except (UnidentifiedImageError, ValueError):
            pass
        return isImage


if __name__ == "__main__":
    print("Creating icons...")
    ico_controller = IconifyPagesController()
    print("Success!\nAdding to database file...")
    ico_controller.generateAndAddIcons(api._BACKUP_FILENAME)
    print("Success!")
