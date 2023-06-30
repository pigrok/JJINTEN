import React, { useEffect } from "react";
import NewsCard from "./NewsCard";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPosts } from "../redux/modules/posts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
function NewsCardContainer() {
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

  const posts = useSelector((state) => {
    return state.posts;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
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
  }, [dispatch]);

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

  return (
    <NewsCardContinerWrapper>
      {posts.sort(compareDateCard).map((post) => {
        return (
          <NewsCard
            key={post.id}
            onClickFunc={() => navigateClick(post.id)}
            createdAt={post.createdAt}
            category={post.category}
            title={post.title}
            body={post.body}
            updatedAt={post.updatedAt}
            isModified={post.isModified}
          />
        );
      })}
    </NewsCardContinerWrapper>
  );
}

export default NewsCardContainer;
