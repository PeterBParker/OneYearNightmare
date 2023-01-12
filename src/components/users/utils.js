import { db } from "../../index";
import {
  doc,
  getDoc,
  setDoc,
  query,
  where,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  writeBatch,
  orderBy,
} from "firebase/firestore";
import { auth } from "../../index";
import { Timestamp } from "firebase/firestore";
import { updateProfile, updateEmail, deleteUser } from "firebase/auth";

export const getDisplayName = async (uid) => {
  const docRef = doc(db, "users", uid);
  return getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      return docSnap.data().display_name;
    } else {
      console.log("No user found for the uid.");
      return null;
    }
  });
};

export const setCommentDisplayName = async (new_name) => {
  let success = false;
  if (auth.currentUser != null) {
    const docRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(docRef, {
      display_name: new_name,
      last_updated: Timestamp.fromDate(new Date()),
    })
      .then(() => {
        success = true;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log(
      "Error: Cannot update user's comment display name. The user is not signed in."
    );
  }
  return success;
};

export const setAuthDisplayName = async (new_name) => {
  let success = false;
  if (auth.currentUser != null) {
    await updateProfile(auth.currentUser, {
      displayName: new_name,
    })
      .then(() => {
        success = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return success;
};

export const validateDisplayName = async (displayName) => {
  let isValid = displayNameValid(displayName);
  if (!isValid) {
    throw new Error("Not a valid display name.");
  }
  let doesExist = await displayNameExists(displayName);
  if (!doesExist) {
    throw new Error("Display name already exists.");
  }
};

export const displayNameExists = async (displayName) => {
  const q = query(
    collection(db, "users"),
    where("display_name", "==", displayName)
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty && displayName.replace(/\s/g, "").length != 0) {
    return true;
  } else {
    return false;
  }
};
export const displayNameValid = (displayName) => {
  if (displayName.replace(/\s/g, "").length != 0) {
    return true;
  } else {
    return false;
  }
};

export const getEmail = async () => {
  let email = null;
  if (auth.currentUser != null) {
    email = auth.currentUser.email;
  }
  return email;
};

export const setEmail = async (newEmail) => {
  let success = false;
  if (auth.currentUser != null) {
    await updateEmail(auth.currentUser, newEmail)
      .then(() => {
        success = true;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  return success;
};

export const deleteComments = async () => {
  let success = false;
  if (auth.currentUser != null) {
    const q = query(
      collection(db, "page_comments"),
      where("author_uid", "==", auth.currentUser.uid),
      orderBy("has_children")
    );
    let querySnapshot = await getDocs(q).catch((error) => {
      throw new Error(error);
    });
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      if (doc.data().has_children == true) {
        batch.update(doc.ref, { author_uid: null, content: null });
      } else batch.delete(doc.ref);
    });
    await batch.commit();
    success = true;
  }
  return success;
};

export const deleteUserWrapper = async () => {
  let success = false;
  if (auth.currentUser != null) {
    deleteUser(auth.currentUser)
      .then(() => {
        success = true;
      })
      .catch((error) => {
        throw new Error(error);
      });
    success = true;
  }
  return success;
};

export const deleteUserCommentId = async () => {
  let success = false;
  if (auth.currentUser != null) {
    deleteDoc(doc(db, "users", auth.currentUser.uid))
      .then(() => {
        success = true;
      })
      .catch((error) => {
        //throw new Error(error);
        console.log(error);
      });
  }
  return success;
};
