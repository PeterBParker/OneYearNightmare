import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage, AVATARS_PATH } from "../../index";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { getDoc } from "firebase/firestore";
import { USER_URL } from "../../api/RefKeys";
import { getUserRef, updateUserData } from "../../api/ComicPageAPI";

// Need a function that returns an object with an image string and metadata
class AvatarData {
  constructor(imageString, metadata) {
    this.image = imageString
    this.type = metadata
  }
}

/**
 * Takes a string and generates an svg avatar off of it
 * @param {string} avatarSeed
 * @returns AvatarData
 */
export function generateAvatarData(avatarSeed) {
  const metadata = {
    contentType: "image/svg+xml",
  };

  const avatarSvg = createAvatar(lorelei, {
    seed: avatarSeed,
  }).toString();

  return new AvatarData(avatarSvg, metadata)
}

/**
 * Takes an uploaded Image and processes it to produce AvatarData
 * @param {Image} image 
 * @returns AvatarData
 */
export function convertImageToAvatarData(image) {
  return new AvatarData("placeholder", {contentType: "image/png"})
}

/**
 * This takes information about an image and stores it as a user's avatar
 * @param {string} userId - The ID of the user to store the URL of
 * @param {AvatarData} avatarData - The information about the image
 */
export const storeUserAvatar = async (userId, avatarData) => {
  const avatarImageRef = getAvatarRef(userId);

   await uploadString(avatarImageRef, avatarData.image, "raw", avatarData.type)
    .catch((error) => {
      switch (error.code) {
        case "storage/unauthorized":
          console.log("Unauthorized upload.");
          throw error
        case "storage/canceled":
          console.log("Upload canceled.");
          throw error
        case "storage/unknown":
          console.log("Unknown error.");
          throw error
        default:
          console.log(error.code);
          throw error
      }
    });
  let url = await getDownloadURL(avatarImageRef);
  return url
};

export const getAvatarRef = (userId) => {
  return ref(storage, AVATARS_PATH + userId);
};

export const getOldAvatarRef = (userId) => {
  return ref(storage, AVATARS_PATH + userId + "_avatar.svg")
}

export const getAvatarUserClassname = (userId) => {
  return userId + "_avatar_container";
};

export const getAvatarUrl = async (userId) => {
  /**
   * Looks for all elements in the dom with a classname specific to the user
   * and sets the src attribute of them with the image url
   */
  let avatarUrl = "";
  if (userId) {
    const userRef = getUserRef(userId); 
    const userSnap = await getDoc(userRef);
    const data = userSnap.data()
    if (data !== undefined && USER_URL in data) {
      avatarUrl = data[USER_URL]
    } else {
      // Try again but use the old method of grabbing a user url
      const oldAvatarRef = await getOldAvatarRef(userId);
      avatarUrl = await getDownloadURL(oldAvatarRef);
      if (!!avatarUrl) {
        // update the user's data to use the new way of storing the avatar url with the user data
        updateUserData(userId, {USER_URL: avatarUrl})
      } else {
        // TODO return an error so the user knows we're missing their avatar?
        // An avatar does not exist for it, and we need to get a default avatar
        avatarUrl = "https://api.dicebear.com/5.x/lorelei/svg";
      }
    }
  } else {
    // An avatar does not exist for it, and we need to get a default avatar
    avatarUrl = "https://api.dicebear.com/5.x/lorelei/svg";
  }
  return avatarUrl;
};

export async function deleteUserAvatar(userID) {
  let ref = getAvatarRef(userID)
  await deleteObject(ref);
}
