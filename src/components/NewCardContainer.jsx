import React, { useCallback, useEffect, useRef, useState } from "react";
import NewsCard from "./NewsCard";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchPostData } from "../util/post";
import useIntersectionObserver from "./InfiniteScroll";
function NewsCardContainer({ sortBy, searchText }) {
  const ref = useRef(null);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLength, setDataLength] = useState(0);
  const prevPropRef = useRef(sortBy);
  const isInitialRender = useRef(true);

  const increasePage = useCallback(() => {
    setPage((prev) => prev + 1);
  });
  const goBackPage = useCallback(() => {
    setPage(1);
  });
  const [observe, unobserve] = useIntersectionObserver(increasePage);
  const navigate = useNavigate();

  async function fetchDatas(sortBy, page) {
    console.log(page + "페이지 불러옴");
    const posts = await fetchPostData(sortBy, page);
    console.log("방금 가져온 데이터 길이: " + posts.length);
    setDataLength((prev) => posts.length);
    setPosts((prev) => [
      ...prev,
      ...posts.map((post) => {
        return { ...post, isVisible: true };
      }),
    ]);
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function removePostData() {
    unobserve(ref.current);
    setPosts((prev) => {
      //배열 초기화
      return [];
    });
    goBackPage();
    await fetchDatas(sortBy, page);
    await sleep(1000);
    observe(ref.current);
  }
  useEffect(() => {
    fetchDatas(sortBy, page);
    setIsLoading(false);
  }, [page]);
  useEffect(() => {
    if (!isInitialRender.current) {
      removePostData();
    } else {
      isInitialRender.current = false;
    }
  }, [sortBy]);
  // useEffect(() => {
  //   observer.unobserve(ref.current);
  //   console.log("검색: 관찰풀음", observer);
  //   const reg = new RegExp(searchText, "i");
  //   let originPosts = [];
  //   for (let i = 0; i < posts.length; i++) {
  //     if (!reg.test(posts[i].title)) {
  //       let tempObj = { ...posts[i] };
  //       tempObj["isVisible"] = false;
  //       originPosts.push(tempObj);
  //     } else {
  //       originPosts.push(posts[i]);
  //     }
  //   }
  //   setPosts(originPosts);
  //   observer.unobserve(ref.current);
  //   console.log("검색: 관찰풀음", observer);
  // }, [searchText]);
  useEffect(() => {
    if (dataLength < 8) {
      console.log("관찰 풀음");
      unobserve(ref.current);
    } else {
      console.log("관찰 유지");
      observe(ref.current);
    }
  }, [dataLength]);

  const navigateClick = (todoId) => {
    navigate(`/${todoId}`);
  };

  return (
    <NewsCardContinerWrapper>
      {posts.map((todo) => {
        if (todo.isVisible) {
          return (
            <NewsCard
              key={todo.id}
              onClickFunc={() => navigateClick(todo.id)}
              createdAt={todo.createdAt}
              category={todo.category}
              title={todo.title}
              body={todo.body}
              updatedAt={todo.updatedAt ? todo.updatedAt : null}
              isModified={todo.isModified}
              like={todo.likeNumber}
              commentsNumber={todo.commentsNumber}
              views={todo.views}
            />
          );
        }
      })}
      <div ref={ref} className="Loading">
        {isLoading && "Loading..."}
      </div>
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
