import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { BiCategory, BiChevronLeftSquare } from "react-icons/bi";
import { FaMapPin, FaHouseFlag } from "react-icons/fa6";

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  console.log(posts);

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

  // 시간 변형
  const processCreatedAt = (dateString) => {
    const date = new Date(Date.parse(dateString));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}시${minute}분`;

    return formattedDate;
  };

  return (
    <div>
      {posts.map((post) => {
        return (
          <PostContainer>
            <PostBox onClick={() => clickToDetail(post.id)} key={post.id}>
              <PostText>
                <PostCategory>
                  <FaMapPin size="21" />
                  {post.category}
                </PostCategory>
                <PostTitle>{post.title}</PostTitle>
                <PostBody>{post.body}</PostBody>
                <p>by. {post.writer}</p> <p>{processCreatedAt(post.createdAt)}</p>
              </PostText>
              <PostImg src={post.fileURL} />
            </PostBox>
          </PostContainer>
        );
      })}
    </div>
  );
};

const PostContainer = styled.div``;

const PostBox = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #e1e1e1e0;
  border-radius: 5px;
  /* box-shadow: 3px 3px 10px rgb(223, 223, 223); */
  padding: 10px;
  margin-bottom: 20px;
`;

const PostText = styled.div`
  width: 90%;
  height: 200px;
`;

const PostCategory = styled.div`
  width: 100px;
  /* background-color: #cdcdcd; */
  border-radius: 10px;
  font-size: 20px;
  text-align: center;

  display: flex;
  align-items: flex-start;
`;

const PostTitle = styled.p`
  font-size: 21px;
  font-weight: 600;
`;

const PostBody = styled.span`
  font-size: 16px;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  color: #575757;
`;

const PostImg = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 5px;
  color: #575757;
  margin: 15px;
`;

export default MyPost;
