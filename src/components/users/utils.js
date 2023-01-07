import { db } from "../../index";
import {
  doc,
  getDoc,
  setDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { auth } from "../../index";
import { Timestamp } from "firebase/firestore";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

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

export const validateDisplayName = async (display_name) => {
  const q = query(
    collection(db, "users"),
    where("display_name", "==", display_name)
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return true;
  } else {
    return false;
  }
};
