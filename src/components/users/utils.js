import { db } from "../../index";
import { doc, getDoc } from "firebase/firestore";

export const getDisplayName = async (uid) => {
  const docRef = doc(db, "users", uid);
  return getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      return docSnap.data().display_name;
    } else {
      console.log("No user found for the uid.");
      return "A Mystery User";
    }
  });
};
