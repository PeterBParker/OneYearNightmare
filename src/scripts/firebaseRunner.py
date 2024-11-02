import firebase_admin
import json
import argparse

from pathlib import Path

from firebase_admin import auth
from firebase_admin.firestore import client
from firebase_admin.storage import bucket


class FirebaseRunner:
    """
    A class to run commands against a setup firebase SDK instance
    """

    def __init__(self, projectId: str):
        default_app = firebase_admin.initialize_app(
            options={"projectId": projectId})
        self.db = client(default_app)
        self.auth = auth.Client(default_app)
        self.pages_dir = Path("../../public/MnMPages/")
        self.blob_pages_prefix = "pages/"
        self.bucket = bucket(
            name="oneyearnightmarefirstsite.appspot.com", app=default_app)

    def addIconDownloadURLToUser(self, user_id: str):
        user_blob = self.bucket.get_blob("user_avatars/"+user_id+"_avatar.svg")
        user_blob.make_public()
        url = user_blob.public_url
        user_ref = self.db.collection("users").document(user_id)
        user_ref.update({"avatar_url": url})

    def addAdminToUser(self, user_id: str):
        self.auth.set_custom_user_claims(user_id, {"admin":True})

    def run(self):
        pass


def initialize_argparser():
    parser = argparse.ArgumentParser(
        prog="Firestore Command Runner",
        description="Runs a command from the admin SDK"
    )
    parser.add_argument("project_id")
    return parser


if __name__ == "__main__":

    parser = initialize_argparser()
    args = parser.parse_args()

    try:
        runner = FirebaseRunner(
            args.project_id)
        runner.run()

    except OSError as err:
        print(err)
