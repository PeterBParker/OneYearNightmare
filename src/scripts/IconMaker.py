from PIL import Image, UnidentifiedImageError
import os


class IconMaker:
    def __init__(self, icon_suffix="-Icon.png"):
        self.icon_suffix = icon_suffix

    def iconify_file(self, dimensions, image_path, output_path):
        """Takes an image and creates a customizable icon

        :param dimensions(tuple(int,int)): The maximum desired height in pixels
        :param image_path(str): The file path for the original image
        :param output_path(str): The file path for the output icon
        """
        if self.validate_file(image_path):
            # amazonq-ignore-next-line
            im = Image.open(image_path)
            im.thumbnail(dimensions)
            im.save(output_path)

    def getIconName(self, base_page_path):
        return os.path.splitext(os.path.basename(base_page_path))[0] + self.icon_suffix

    @staticmethod
    def validate_file(file_path):
        """Filters out the files that aren't images

        :param file_path(str): The file path of a suspected image

        :returns: Whether the file is an image or not
        :rtype: boolean
        """
        isImage = False
        try:
            # amazonq-ignore-next-line
            if Image.open(file_path):
                isImage = True
        except (UnidentifiedImageError, ValueError):
            pass
        return isImage
