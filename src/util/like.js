import { collection, deleteDoc, doc, getDocs, query, updateDoc, where, getDoc } from "firebase/firestore";
import { db } from "../firebase";
export const likeDB = async (userId, todoId) => {
  const docRef = doc(db, "likes", todoId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let { likeNumber, likePeople } = docSnap.data();
    await updateDoc(docRef, {
      likeNumber: likeNumber + 1,
      likePeople: [...likePeople, userId],
    });
    return true;
  } else {
    console.log("No such document!");
    return false;
  }
};
export const unLikeDB = async (userId, todoId) => {
  const docRef = doc(db, "likes", todoId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let { likeNumber, likePeople } = docSnap.data();
    await updateDoc(docRef, {
      likeNumber: likeNumber - 1,
      likePeople: likePeople.filter((person) => {
        return person !== userId;
      }),
    });
    return true;
  } else {
    console.log("No such document!");
    return false;
  }
};
export const fetchLikeDB = async (todoId) => {
  const docRef = doc(db, "likes", todoId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let likeObj = docSnap.data();
    return likeObj;
  } else {
    console.log("No such document!");
    return false;
  }
};
export const didIPressed = (likeArr, userId) => {
  for (let i = 0; i < likeArr.length; i++) {
    if (likeArr[i] === userId) return true;
  }
  return false;
};
