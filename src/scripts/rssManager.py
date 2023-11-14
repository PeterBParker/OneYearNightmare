from typing import Dict

from feedgen.feed import FeedGenerator
from json import load, JSONDecodeError
from datetime import datetime
from pytz import timezone

PAGES_PATH_DATA = "../api/data/pagesData.json"
DATETIME_FMT = "%Y-%m-%d %H:%M:%S"
CENTRAL_TZ = timezone('US/Central')


class RssManager:
    # Static metadata about my blog
    _BLOG_METADATA = {
        "id": "https://www.monstersandmyriads.com/",
        "title": "Monsters and Myriads Comic",
        "author": {"name": "Nathan", "email": "nate-and-mo@monstersandmyriads.com"},
        "link": "https://www.monstersandmyriads.com/read/",
        "logo": "https://www.monstersandmyriads.com/logo192.png",
        "language": "en",
        "description": "Midwest mystery webcomic that's slightly spooky and mostly goofy",
    }

    def create_feed(
        self,
        pages_obj: Dict,
        xmlfile: str = "../../public/rss.xml"
    ) -> None:
        """
        Create an RSS XML file from the provided json object.

        pages_obj: (Dict) the json object representing the comic's pages
        xmlfile: (String) path to RSS XML file to write to disk

        """
        fg = FeedGenerator()
        fg.id(self._BLOG_METADATA["id"])
        fg.title(self._BLOG_METADATA["title"])
        fg.author(
            {"name": self._BLOG_METADATA["author"]["name"],
                "email": self._BLOG_METADATA["author"]["email"]}
        )
        fg.logo(self._BLOG_METADATA["logo"])
        fg.link(href=self._BLOG_METADATA["link"], rel="self")
        fg.language(self._BLOG_METADATA["language"])
        fg.description(self._BLOG_METADATA["description"])

        for season in pages_obj.get("seasons"):
            for chapter in season.get("chapters"):
                for page in chapter.get("pages"):
                    page_url = self._BLOG_METADATA["link"] + page["uuid"]
                    fe = fg.add_entry(order="append")
                    fe.id(page_url)
                    fe.title(page["title"])
                    fe.published(self.get_published_datetime(page["datetime"]))
                    fe.author(
                        {"name": self._BLOG_METADATA["author"]["name"],
                            "email": self._BLOG_METADATA["author"]["email"]}
                    )
                    fe.link({"href": page_url, "title": page["title"]})

        # rssfeed = fg.rss_str(pretty=True)
        # print(rssfeed)
        fg.rss_file(xmlfile)

    @staticmethod
    def get_published_datetime(datetime_str: str):
        d = datetime.strptime(datetime_str, DATETIME_FMT)
        d_tz = CENTRAL_TZ.localize(d)
        return d_tz


if __name__ == "__main__":
    rm = RssManager()
    pages_obj = {}
    try:
        with open(PAGES_PATH_DATA, "r", encoding="utf-8") as f:
            pages_obj = load(f)
        rm.create_feed(pages_obj)
    except (OSError, JSONDecodeError) as e:
        print(e)
