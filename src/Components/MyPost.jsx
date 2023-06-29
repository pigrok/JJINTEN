import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const MyPost = () => {
  const params = useParams();
  const state = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "todos"));
      const querySnapshot = await getDocs(q);

      const initialTodos = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        console.log(doc);

        // const myPosts = data.filter((d) => d.uid === params.id);

        initialTodos.push(data);
      });

      //  setTodos(initialTodos);
    };
    fetchData();
  }, []);

  return <div>MyPost</div>;
};

export default MyPost;
