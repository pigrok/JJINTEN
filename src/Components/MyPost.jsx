import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "posts"), where("uid", "==", params.id));
      const querySnapshot = await getDocs(q);

      const initArray = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        initArray.push(data);
        setPosts(initArray);
      });
    };
    fetchData();
  }, []);

  const clickToDetail = (postId) => {
    navigate(`/${postId}`);
  };

  return (
    <div>
      {posts.map((post) => {
        return (
          <div onClick={() => clickToDetail(post.id)} key={post.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <p>카테고리 : {post.category}</p>
            <p>제목 : {post.title}</p>
            <p>내용 : {post.body}</p>
            <p>날짜 : {post.createdAt}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MyPost;
