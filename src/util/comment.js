import { collection, deleteDoc, doc, getDocs, query, updateDoc, where, getDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchComments = async (postId) => {
  try {
    const q = await query(collection(db, "comments"), where("postId", "==", postId));
    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return data;
    });
    return comments;
  } catch (error) {
    console.log(error);
  }
};
export const countComments = async (postId) => {
  try {
    const q = await query(collection(db, "comments"), where("postId", "==", postId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.log(error);
  }
};
export const addComment = async (postId, data) => {
  try {
    await addDoc(collection(db, "comments"), data);
    const docRef = query(collection(db, "posts"), where("id", "==", postId));
    const querySnapshot = await getDocs(docRef);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        await updateDoc(docRef, {
          commentNumber: data.commentNumber + 1,
        });
        return true;
      } else {
        console.log("No such document!");
        return false;
      }
    }
  } catch (error) {
    console.error("데이터 추가 에러:", error);
  }
};
