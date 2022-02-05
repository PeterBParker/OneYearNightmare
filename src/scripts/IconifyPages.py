import addPage as api
import os
from iconMaker import IconMaker
from pathlib import Path
from PIL import Image, UnidentifiedImageError


class IconifyPagesController:
    def __init__(self, icon_suffix="-Icon.png", icon_dir="icons/"):
        self.icon_suffix = icon_suffix
        self.icon_dir = icon_dir

    def iconifyAllExistingPages(self):
        iconer = IconMaker()
        pagesDir = Path("../../public/MnMPages/")
        iconsDir = Path("../assets/page_icons/test.png")
        tempPath = Path("../../public/MnMPages/prologue/chapter1/Pg0-FILLER-cover.jpg")
        iconer.iconify_file((150, 150), tempPath, iconsDir)

        for seasonDir in pagesDir.iterdir():
            for chapterDir in seasonDir.iterdir():
                icon_dir = chapterDir / "icons"
                for page in chapterDir.iterdir():
                    if os.path.basename(page) == "icons":
                        continue
                    icon_filename = (
                        os.path.splitext(os.path.basename(page))[0] + self.icon_suffix
                    )
                    icon_path = icon_dir / icon_filename
                    iconer.iconify_file((200, 200), page, icon_path)

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
            im.save(output_path, format="JPEG")

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
