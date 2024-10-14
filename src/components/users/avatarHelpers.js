import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage, AVATARS_PATH } from "../../index";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { NO_USER_ID, db } from "../../index";
import { updateDoc, doc, collection } from "firebase/firestore";
import { USER_URL } from "../../api/RefKeys";

export const storeUserAvatar = async (userId, displayName) => {
  let success = false;
  const avatarImageRef = getAvatarRef(userId);

  const metadata = {
    contentType: "image/svg+xml",
  };

  const avatarSvg = createAvatar(lorelei, {
    seed: displayName,
  }).toString();

  success = await uploadString(avatarImageRef, avatarSvg, "raw", metadata)
    .then((uploadResult) => {
      success = true;
    })
    .catch((error) => {
      switch (error.code) {
        case "storage/unauthorized":
          console.log("Unauthorized upload.");
          break;
        case "storage/canceled":
          console.log("Upload canceled.");
          break;
        case "storage/unknown":
          console.log("Unknown error.");
          break;
        default:
          console.log(error.code);
      }
    });

  if (success) {
    let url = await getDownloadURL(avatarImageRef);
    // Store the url in the user
    const userRef = doc(collection(db, "users"), userId);
    updateDoc(userRef, { [USER_URL]: url });
  }
  return success;
};

export const getAvatarRef = (userId) => {
  return ref(storage, AVATARS_PATH + userId + "_avatar.svg");
};

export const getAvatarUserClassname = (userId) => {
  return userId + "_avatar_container";
};

export const getAvatarUrl = async (userId) => {
  /**
   * Looks for all elements in the dom with a classname specific to the user
   * and sets the src attribute of them with the image url
   */
  let avatarUrl = "";
  let avatarRef = "";
  if (userId) {
    avatarRef = getAvatarRef(userId);
  } else {
    avatarRef = getAvatarRef(NO_USER_ID);
  }
  try {
    avatarUrl = await getDownloadURL(avatarRef);
  } catch (error) {
    switch (error.code) {
      case "storage/object-not-found":
        // An avatar does not exist for it, and we need to get a default avatar
        return "https://api.dicebear.com/5.x/lorelei/svg";
      default:
        console.log(error.code);
    }
  }

  return avatarUrl;
};
