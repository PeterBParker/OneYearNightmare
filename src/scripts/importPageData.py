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
    def __init__(self, projectId: str):
        default_app = firebase_admin.initialize_app(
            options={"projectId": projectId})
        self.db = client(default_app)
        self.pages_dir = Path("../../public/MnMPages/")
        self.blob_pages_prefix = "pages/"
        self.bucket = bucket(
            name="oneyearnightmarefirstsite.appspot.com", app=default_app)

    def get_page_ref(self, page):
        return self.db.collection("book_data").document("content").collection("pages").document(page["uuid"])

    def get_chap_ref(self, chap):
        return self.db.collection("book_data").document("content").collection("chapters").document(chap["uuid"])

    def get_season_ref(self, season):
        return self.db.collection("book_data").document("content").collection("seasons").document(season["uuid"])

    def get_page_url(self, page, chap, season):
        name = self.blob_pages_prefix + page["filename"]
        blob = self.bucket.get_blob(name)
        blob.make_public()
        if blob is None:
            # Upload image from stored pages
            print("Blob not found for:", name, "uploading now...")
            new_blob = self.bucket.blob(name)
            page_path = self.pages_dir / \
                season["folderName"] / chap["folderName"] / page["filename"]
            new_blob.upload_from_filename(page_path)
            new_blob.make_public()
            return new_blob.public_url
        else:
            return blob.public_url

    def run(self, json_data: dict):
        batch = self.db.batch()
        for season in json_data["seasons"]:
            for chap in season["chapters"]:
                for page in chap["pages"]:
                    url = None
                    try:
                        url = self.get_page_url(page, chap, season)
                    except OSError as e:
                        print("Encountered error while trying to upload:",
                              page["filename"], e)
                    if url is None:
                        continue
                    del_list = ["pageNum", "globalPageNum",
                                "nextPageUuid", "prevPageUuid"]
                    ref = self.get_page_ref(page)

                    # Rename some var names to be consistent
                    page["chap_order"] = page["pageNum"]
                    page["icon"] = page["icon"].split("/")[1]
                    page["global_order"] = page["globalPageNum"]
                    page["next_page_id"] = page["nextPageUuid"]
                    page["prev_page_id"] = page["prevPageUuid"]
                    page["chapter_id"] = chap["uuid"]
                    page["season_id"] = season["uuid"]
                    page["public_url"] = url

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
    return parser


if __name__ == "__main__":

    parser = initialize_argparser()
    args = parser.parse_args()

    try:

        json_data = {}
        with open(args.json_filepath, "r", encoding="utf-8") as f:
            json_data = json.load(f)

        importer = FirestoreImporter(args.project_id)
        importer.run(json_data)

    except OSError as err:
        print(err)
