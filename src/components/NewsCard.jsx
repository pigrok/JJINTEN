import React from "react";
import { styled } from "styled-components";
import logoPic from "../assets/logo.png";
function NewsCard({ createdAt, category, title, body, writer, onClickFunc, isModified, updatedAt, fileURL, like, views, commentNumber }) {
  const cardOnClick = () => {
    onClickFunc();
  };

  const processCreatedAt = (dateString) => {
    const date = new Date(Date.parse(dateString));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}년${month}월${day}일`;
    return formattedDate;
  };

  const modifiedDate = () => {
    if (isModified) {
      return updatedAt;
    } else {
      return createdAt;
    }
  };

  return (
    <>
      <SNewsCard onClick={cardOnClick}>
        <ImgBox>
          <NewsCardImage src={fileURL ? fileURL : logoPic}></NewsCardImage>
        </ImgBox>
        <NewCardInfoSection>
          <NewsEmojiInfos style={{ gridColumn: "1/4", gridRow: "1" }}>by: {writer}</NewsEmojiInfos>
          <NewsEmojiInfos style={{ gridColumn: "4/7", gridRow: "1" }}>{processCreatedAt(modifiedDate())}</NewsEmojiInfos>
          {isModified ? <NewsEmojiInfos style={{ gridColumn: "7/8", gridRow: "1" }}>(수정됨)</NewsEmojiInfos> : <></>}
          <NewsCategory style={{ gridColumn: "1/8", gridRow: "2" }}>{category}</NewsCategory>
          <NewsTitle style={{ gridColumn: "1/8", gridRow: "3" }}>{title}</NewsTitle>
          <NewsDesc style={{ gridColumn: "1/8", gridRow: "4/6" }}>{body}</NewsDesc>
          <NewsEmojiInfos style={{ gridColumn: "1/4", gridRow: "6" }}>조회수:{views}</NewsEmojiInfos>
          <NewsEmojiInfos style={{ gridColumn: "4/6", gridRow: "6" }}>{commentNumber}개의 댓글</NewsEmojiInfos>
          <NewsEmojiInfos style={{ gridColumn: "6/8", gridRow: "6" }}>♥: {like}</NewsEmojiInfos>
        </NewCardInfoSection>
      </SNewsCard>
    </>
  );
}

const SNewsCard = styled.div`
  background-color: rgba(255, 255, 255, 0);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  color: #000000;
  width: 300px;
  height: 300px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 5px 17px 0px;
  transition: transform 0.25s ease-in 0s, box-shadow 0.25s ease-in 0s;
  animation: entrance 0.2s;
  margin-bottom: 20px;
  &:hover {
    box-shadow: 0px 0px 10px #ccc;
    transform: translateY(-5px);
  }
  @keyframes entrance {
    from {
      transform: scale(0.01);
    }
    to {
      transform: scale(1);
    }
  }
`;
const ImgBox = styled.div`
  position: relative;
  width: 300px;
  height: 150px;
  overflow: hidden;
  margin: 0 auto;
  z-index: -1;
`;
const NewsCardImage = styled.img`
  border-radius: 5px 5px 0 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const NewCardInfoSection = styled.div`
  margin: 0 auto;
  height: 150px;
  width: 290px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
`;
const NewsCategory = styled.span`
  /* width: 55px; */
  /* color: #909090; */
  font-size: 14px;
  /* border-top: 1px solid #dcdcdc; */
  border-bottom: 1px solid #dcdcdc;
  /* border: 1px solid #dcdcdc; */
`;
const NewsTitle = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 18px;
  padding-bottom: 10px;
`;
const NewsDesc = styled.span`
  height: 65px;
  /* overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word; */

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  /* -webkit-box-orient: vertical; */

  margin-top: 0;
  margin-bottom: 0;
  font-size: 12px;
`;
const NewsEmojiInfos = styled.span`
  color: #909090;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  padding: 5px 5px;
`;

export default NewsCard;
