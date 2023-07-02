import { collection, deleteDoc, doc, getDocs, query, updateDoc, where, getDoc, limit, orderBy, startAfter, startAt, endAt } from "firebase/firestore";
import { db } from "../firebase";
export const fetchPostData = async (sortBy = "createdAt", realPage = 1) => {
  const page = realPage - 1;
  try {
    if (page === 0) {
      const next = query(collection(db, "posts"), orderBy(sortBy, "desc"), limit(8));
      const snap = await getDocs(next);
      const posts = snap.docs.map((doc) => {
        const data = doc.data();
        return data;
      });
      return posts;
    } else if (page > 0) {
      const pageView = page * 8;
      const index = query(collection(db, "posts"), orderBy(sortBy, "desc"), limit(pageView));
      const documentSnapshots = await getDocs(index);
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      const next = query(collection(db, "posts"), orderBy(sortBy, "desc"), startAfter(lastVisible), limit(8));
      const snap = await getDocs(next);
      const posts = snap.docs.map((doc) => {
        const data = doc.data();
        return data;
      });
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
};
export const increaseViewDB = async (todoId) => {
  try {
    const docRef = query(collection(db, "posts"), where("id", "==", todoId));
    const querySnapshot = await getDocs(docRef);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        await updateDoc(docRef, {
          views: data.views + 1,
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
export const fetchPostDataSearch = async (sortBy = "body", realPage = 0, searchKeyword = "") => {
  const page = realPage - 1;
  try {
    if (page === 0) {
      const next = query(collection(db, "posts"), orderBy(sortBy, "desc"), limit(8));
      const snap = await getDocs(next);
      const posts = snap.docs.map((doc) => {
        const data = doc.data();
        return data;
      });
      return posts;
    } else if (page > 0) {
      const pageView = page * 8;
      const index = query(collection(db, "posts"), orderBy(sortBy, "desc"), limit(pageView));
      const documentSnapshots = await getDocs(index);
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      const next = query(collection(db, "posts"), orderBy(sortBy, "desc"), startAfter(lastVisible), limit(8));
      const snap = await getDocs(next);
      const posts = snap.docs.map((doc) => {
        const data = doc.data();
        return data;
      });
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
};
