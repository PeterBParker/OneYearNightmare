import addPage as api
import os
from pathlib import Path
from IconMaker import IconMaker


class IconifyPagesController:
    def __init__(
        self, icon_suffix="-Icon.png", icon_dir=Path("icons/"), icon_dims=(200, 200)
    ):
        self.icon_suffix = icon_suffix
        self.icon_dir = icon_dir
        self.icon_dims = icon_dims

    def iconifyExistingPage(self, page_file_path, icon_dir):
        """Saves a copy of an image as an icon.

        :param page_file_path(pathlib.Path): An absolute filepath to an image
        :param icon_dir(pathlib.Path): An absolute filepath to the output dir

        :returns: path to the icon
        :rtype: pathlib.Path
        """
        iconer = IconMaker()
        icon_filename = iconer.getIconName(page_file_path)
        icon_path = icon_dir / icon_filename
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

    def addIconPathsToDb(self, db_filename):
        data = api.getData(db_filename, "r")
        for season in data["seasons"]:
            for chapter in season["chapters"]:
                for page in chapter["pages"]:
                    page["icon"] = (
                        str(self.icon_dir) + "/"
                        + os.path.splitext(page["filename"])[0]
                        + self.icon_suffix
                    )
        api.writeToFile(data, db_filename)

    def generateAndAddIcons(self, db_filename):
        self.iconifyAllExistingPages()
        self.addIconPathsToDb(db_filename)


if __name__ == "__main__":
    print("Creating icons...")
    ico_controller = IconifyPagesController()
    print("Success!\nAdding to database file...")
    ico_controller.generateAndAddIcons(api._DATA_FILENAME)
    print("Success!")
