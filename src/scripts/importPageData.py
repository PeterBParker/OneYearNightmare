"""
To run, first activate the venv with:
.venv/Scripts/activate
"""
import firebase_admin
import json
import argparse

from firebase_admin.firestore import client


class FirestoreImporter:
    def __init__(self, projectId: str):
        default_app = firebase_admin.initialize_app(
            options={"projectId": projectId})
        self.db = client(default_app)

    def get_page_ref(self, page):
        return self.db.collection("book_data").document("content").collection("pages").document(page["uuid"])

    def run(self, json_data: dict):
        batch = self.db.batch()
        for season in json_data["seasons"]:
            for chap in season["chapters"]:
                for page in chap["pages"]:
                    del_list = ["pageNum", "globalPageNum",
                                "nextPageUuid", "prevPageUuid"]
                    ref = self.get_page_ref(page)

                    # Rename some var names to be consistent
                    page["chap_order"] = page["pageNum"]
                    page["icon"] = page["icon"].split("/")[1]
                    page["global_order"] = page["globalPageNum"]
                    page["next_page_id"] = page["nextPageUuid"]
                    page["prev_page_id"] = page["prevPageUuid"]

                    # Remove all the old var names
                    for key in del_list:
                        del page[key]

                    batch.set(ref, page)
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
