from PIL import Image, UnidentifiedImageError
import argparse
from pathlib import Path


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
    parser = argparse.ArgumentParser()
    parser.add_argument("dir", help="The directory of the image(s) you want to convert")
    args = parser.parse_args()

    file_path = Path(args.dir)
    if not file_path.exists():
        print("ERROR: File path doesn't exist.")
        quit()
