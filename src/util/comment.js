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
export const commentDeleteHandlerDB = async (commentId, postId) => {
  try {
    const q = query(collection(db, "comments"), where("id", "==", commentId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);
      alert("댓글이 삭제되었습니다.");
      const postDocRef = query(collection(db, "posts"), where("id", "==", postId));
      const postQuerySnapshot = await getDocs(postDocRef);
      if (!postQuerySnapshot.empty) {
        console.log("-1됨");
        const postDocRef = postQuerySnapshot.docs[0].ref;
        const postQuerySnap = await getDoc(postDocRef);
        if (postQuerySnap.exists()) {
          const data = postQuerySnap.data();
          await updateDoc(postDocRef, {
            commentNumber: data.commentNumber - 1,
          });
          return true;
        } else {
          console.log("No such document!");
          return false;
        }
      } else {
        console.log("해당 id를 가진 문서를 찾을 수 없습니다.");
      }
    }
  } catch (e) {
    console.log(e);
  }
};
