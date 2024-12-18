"""
To run, first activate the venv with:
.venv/Scripts/activate
"""
import firebase_admin
import json
import argparse

from pathlib import Path

from firebase_admin.firestore import client
from firebase_admin.storage import bucket


class FirestoreImporter:
    def __init__(self, projectId: str, nathan_id: str, mo_id: str):
        default_app = firebase_admin.initialize_app(
            options={"projectId": projectId})
        self.db = client(default_app)
        self.pages_dir = Path("../../public/MnMPages/")
        self.blob_pages_prefix = "pages/"
        self.blob_icons_prefix = self.blob_pages_prefix + "icons/"
        self.bucket = bucket(
            name="oneyearnightmarefirstsite.appspot.com", app=default_app)
        self.NATHAN_ID = nathan_id
        self.MORGHAN_ID = mo_id

    def get_page_ref(self, page):
        return self.db.collection("book_data").document("content").collection("pages").document(page["uuid"])

    def get_chap_ref(self, chap):
        return self.db.collection("book_data").document("content").collection("chapters").document(chap["uuid"])

    def get_season_ref(self, season):
        return self.db.collection("book_data").document("content").collection("seasons").document(season["uuid"])

    def get_page_url(self, page, chap, season):
        name = self.blob_pages_prefix + page["filename"]
        page_path = self.pages_dir / \
                season["folderName"] / chap["folderName"] / page["filename"]
        return self.get_blob_url(name, page_path)

    def get_blob_url(self, blob_name, file_path):
        """ Creates a blob if it doesn't exist and upload the file provided to it """
        blob = self.bucket.get_blob(blob_name)
        if blob is None:
            # Upload image from stored pages
            print("Blob not found for:", blob_name, "uploading now...")
            new_blob = self.bucket.blob(blob_name)
            new_blob.upload_from_filename(file_path)
            new_blob.make_public()
            return new_blob.public_url
        else:
            blob.make_public()
            return blob.public_url

    def get_icon_url(self, page, chap, season):
        name = self.blob_icons_prefix + page["filename"]
        icon_path = self.pages_dir / season["folderName"] / chap["folderName"] / page["icon"]
        return self.get_blob_url(name, icon_path)

    def run(self, json_data: dict):
        batch = self.db.batch()
        for season in json_data["seasons"]:
            for chap in season["chapters"]:
                for page in chap["pages"]:
                    url = None
                    try:
                        url = self.get_page_url(page, chap, season)
                        icon_url = self.get_icon_url(page, chap, season)
                    except OSError as e:
                        print("Encountered error while trying to upload:",
                              page["filename"], e)
                    if url is None:
                        continue
                    del_list = ["pageNum", "globalPageNum",
                                "nextPageUuid", "prevPageUuid", "user", "icon"]
                    ref = self.get_page_ref(page)

                    # Rename some var names to be consistent
                    page["chap_order"] = page["pageNum"]
                    page["global_order"] = page["globalPageNum"]
                    page["next_page_id"] = page["nextPageUuid"]
                    page["prev_page_id"] = page["prevPageUuid"]
                    page["chapter_id"] = chap["uuid"]
                    page["season_id"] = season["uuid"]
                    page["public_url"] = url
                    page["icon_url"] = icon_url
                    if page["user"] == "N1995":
                        page["author"] = self.NATHAN_ID
                    else:
                        page["author"] = self.MORGHAN_ID

                    # Remove all the old var names
                    for key in del_list:
                        del page[key]

                    batch.set(ref, page)

                chap_del_list = ["chapterName",
                                 "folderName", "numOfPages", "pages"]
                chap["chapter_name"] = chap["chapterName"]
                chap["folder_name"] = chap["folderName"]
                chap["num_of_pages"] = chap["numOfPages"]

                for key in chap_del_list:
                    del chap[key]

                chapRef = self.get_chap_ref(chap)
                batch.set(chapRef, chap)
            season_del_list = ["seasonName",
                               "folderName", "numOfPages", "chapters"]
            season["season_name"] = season["seasonName"]
            season["num_of_pages"] = season["numOfPages"]
            season["num_of_chapters"] = season["numOfChapters"]

            for key in season_del_list:
                del season[key]

            seasonRef = self.get_season_ref(season)
            batch.set(seasonRef, season)
        batch.commit()


def initialize_argparser():
    parser = argparse.ArgumentParser(
        prog="Firestore Data Importer",
        description="Imports JSON data into your firestore"
    )
    parser.add_argument("json_filepath")
    parser.add_argument("project_id")
    parser.add_argument("nathan_id")
    parser.add_argument("mo_id")
    return parser


if __name__ == "__main__":

    parser = initialize_argparser()
    args = parser.parse_args()

    try:

        json_data = {}
        with open(args.json_filepath, "r", encoding="utf-8") as f:
            json_data = json.load(f)

        importer = FirestoreImporter(
            args.project_id, args.nathan_id, args.mo_id)
        importer.run(json_data)

    except OSError as err:
        print(err)
