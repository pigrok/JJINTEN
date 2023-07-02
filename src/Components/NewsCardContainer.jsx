import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPosts } from "../redux/modules/posts";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

function NewsCardContainer({ category }) {
  const posts = useSelector((state) => {
    return state.posts;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "posts"), category === "전체" ? "" : where("category", "==", category));
        const querySnapshot = await getDocs(q);

        const posts = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt;
          return { id: doc.id, ...data, createdAt };
        });
        dispatch(setPosts(posts));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, category]);

  useEffect(() => {
    dispatch(setPosts(posts));
  }, [dispatch, posts]);

  const navigateClick = (postId) => {
    navigate(`/${postId}`);
  };

  const compareDateCard = (a, b) => {
    const aDate = new Date(modifiedDateCard(a));
    const bDate = new Date(modifiedDateCard(b));
    return bDate - aDate;
  };

  const modifiedDateCard = (post) => {
    if (post.isModified) {
      return post.updatedAt;
    } else {
      return post.createdAt;
    }
  };

  console.log(posts);

  return (
    <NewsCardContinerWrapper>
      {posts.sort(compareDateCard).map((post) => {
        return (
          <NewsCard
            key={post.id}
            onClickFunc={() => navigateClick(post.id)}
            category={post.category}
            title={post.title}
            body={post.body}
            writer={post.writer}
            updatedAt={post.updatedAt}
            createdAt={post.createdAt}
            isModified={post.isModified}
            fileURL={post.fileURL}
            // writer={post.writer}
          />
        );
      })}
    </NewsCardContinerWrapper>
  );
}

const NewsCardContinerWrapper = styled.div`
  display: grid;
  @media screen and (min-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 780px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1060px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default NewsCardContainer;
