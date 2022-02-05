from iconMaker import IconMaker
from pathlib import Path
import os

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
            icon_filename = os.path.splitext(os.path.basename(page))[0] + "-Icon.png"
            icon_path = icon_dir / icon_filename
            iconer.iconify_file((200, 200), page, icon_path)
