import React from "react";
import NewsCard from "./NewsCard";
import { styled } from "styled-components";

function NewsCardContainer() {
  const NewsCardContinerWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  `;
  return (
    <NewsCardContinerWrapper>
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
    </NewsCardContinerWrapper>
  );
}

export default NewsCardContainer;
