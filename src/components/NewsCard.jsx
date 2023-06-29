import React from "react";
import { styled } from "styled-components";
import testImage1 from "../assets/random1000/test (1).png";

function NewsCard(props) {
  const SNewsCard = styled.div`
    margin: 0;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    cursor: pointer;
    font-family: "Noto Sans KR";
    border-radius: 5px;
    color: #000000;
    width: 300px;
    height: 300px;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 5px 17px 0px;
    transition: transform 0.25s ease-in 0s, box-shadow 0.25s ease-in 0s;
    &:hover {
      box-shadow: 0px 0px 10px #ccc;
      transform: translateY(-5px);
    }
  `;
  const ImgBox = styled.div`
    width: 300px;
    height: 150px;
    overflow: hidden;
    margin: 0 auto;
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
  const NewsTitle = styled.p`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 20px;
    padding-bottom: 5px;
  `;
  const NewsDesc = styled.span`
    height: 65px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 12px;
  `;
  const NewsEmojiInfos = styled.span`
    color: grey;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    padding: 5px 5px;
  `;

  return (
    <>
      <SNewsCard>
        <ImgBox>
          <NewsCardImage src={testImage1} />
        </ImgBox>
        <NewCardInfoSection>
          <NewsEmojiInfos style={{ gridColumn: "1/4", gridRow: "1" }}>by:무함마드알콰리즈미</NewsEmojiInfos>
          <NewsEmojiInfos style={{ gridColumn: "4/7", gridRow: "1" }}>YYYY년MM월DD일</NewsEmojiInfos>
          <NewsTitle style={{ gridColumn: "1/7", gridRow: "2" }}>아아아아아아아아아아아아아아아아아아아아</NewsTitle>
          <NewsDesc style={{ gridColumn: "1/7", gridRow: "3/5" }}>
            아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아
          </NewsDesc>
          <NewsEmojiInfos style={{ gridColumn: "1/3", gridRow: "6" }}>조회수:93201</NewsEmojiInfos>
          <NewsEmojiInfos style={{ gridColumn: "3/5", gridRow: "6" }}>32432개의 댓글</NewsEmojiInfos>
          <NewsEmojiInfos style={{ gridColumn: "5/7", gridRow: "6" }}>♥:30999</NewsEmojiInfos>
        </NewCardInfoSection>
      </SNewsCard>
    </>
  );
}

export default NewsCard;
