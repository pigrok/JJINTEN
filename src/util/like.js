import { collection, deleteDoc, doc, getDocs, query, updateDoc, where, getDoc } from "firebase/firestore";
import { db } from "../firebase";
export const likeDB = async (userId, todoId) => {
  try {
    const docRef = query(collection(db, "posts"), where("id", "==", todoId));
    const querySnapshot = await getDocs(docRef);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        await updateDoc(docRef, {
          likeNumber: data.likeNumber + 1,
          likePeople: [...data.likePeople, userId],
        });
        return true;
      } else {
        console.log("No such document!");
        return false;
      }
    }
  } catch (e) {
    console.log(e);
  }
};
export const unLikeDB = async (userId, todoId) => {
  try {
    const docRef = query(collection(db, "posts"), where("id", "==", todoId));
    const querySnapshot = await getDocs(docRef);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        await updateDoc(docRef, {
          likeNumber: data.likeNumber - 1,
          likePeople: data.likePeople.filter((person) => {
            return person !== userId;
          }),
        });
        return true;
      } else {
        console.log("No such document!");
        return false;
      }
    }
  } catch (e) {
    console.log(e);
  }
};
export const fetchLikeDB = async (todoId) => {
  try {
    const docRef = query(collection(db, "posts"), where("id", "==", todoId));
    const querySnapshot = await getDocs(docRef);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return { likeNumber: data.likeNumber, likePeople: data.likePeople };
      } else {
        console.log("No such document!");
        return false;
      }
    }
  } catch (e) {
    console.log(e);
  }
};
export const didIPressed = (likeArr, userId) => {
  for (let i = 0; i < likeArr.length; i++) {
    if (likeArr[i] === userId) return true;
  }
  return false;
};
