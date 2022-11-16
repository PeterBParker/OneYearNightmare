import { db } from "../../index";
import { doc, getDoc, query, where, collection, getDocs } from "firebase/firestore";

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

export const validateDisplayName = async (display_name) => {
  const q = query(collection(db, "users"), where("display_name", "==", display_name));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return true
  } else {
    return false
  }
}
