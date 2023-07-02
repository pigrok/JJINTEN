import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsCardContainer from "../components/NewCardContainer";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Form from "../components/Form";
import Button from "../components/Button";

function MainPage() {
  const state = useSelector((state) => state.auth);
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [category, setCategory] = useState("전체");
  const categories = ["전체", "페스티벌", "연극", "뮤지컬", "전시", "공연", "콘서트"];

  // 로그인 모달 열기
  const openLoginModal = () => {
    if (!state.user) {
      setLoginModal(true);
    }
  };

  // 글쓰기 모달 열기
  const openFormModal = () => {
    if (!state.user) {
      setLoginModal(true);
    } else {
      setFormModal(true);
    }
  };

  const sortByView = () => {};
  const sortByLike = () => {};
  const sortByComment = () => {};

  return (
    <MainPageWrapper>
      <SignUp signUpModal={signUpModal} setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <Login setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <LeftContainer>
        <CategoryMenuBar>
          {categories.map((category) => {
            return (
              <p key={category} onClick={() => setCategory(category)}>
                {category}
              </p>
            );
          })}
        </CategoryMenuBar>
      </LeftContainer>
      <RightContainer>
        <LinkBanner></LinkBanner>
        <WriteSection onClick={openFormModal}>글쓰기✏️</WriteSection>
        <Form formModal={formModal} setFormModal={setFormModal} />
        <SortSection>
          <SortButton>조회수순</SortButton>
          <SortButton>좋아요순</SortButton>
          <SortButton>댓글순</SortButton>
        </SortSection>
        <CardSection>
          <NewsCardContainer category={category} />
        </CardSection>
      </RightContainer>
    </MainPageWrapper>
  );
}

const MainPageWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px minmax(400px, 1250px) 50px;
`;
const LeftContainer = styled.div`
  -webkit-box-align: center;
  align-items: center;
  text-align: center;
`;
const CategoryMenuBar = styled.div`
  width: 80px;
  height: 500px;
  top: 200px;
  border: 1px solid black;
  position: fixed;
  /* margin: 20px; */
`;
const RightContainer = styled.div`
  /* display: inline; */
  width: 100%;
  /* grid-row-gap: 10px;
  grid-template-rows: 30px 30px auto; */
`;

const LinkBanner = styled.div`
  width: 100%;
  height: 350px;
  /* border: 1px solid black; */
`;

const WriteSection = styled(Button)`
  width: 100%;
`;
const SortSection = styled.div`
  height: 30px;
  text-align: right;
`;
const CardSection = styled.div`
  height: auto;
  width: 100%;
`;
const SortButton = styled(Button)`
  margin-right: 5px;
`;
const GoUpButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50% 50%;
  position: fixed;
  border: 1px solid black;
  cursor: pointer;
  background-color: #dddddd;
  &:hover {
    background-color: #ffffff;
  }
  @media all and (max-width: 700px) {
    display: none;
  }
  /* PC (해상도 1024px)*/
  @media all and (min-width: 1024px) {
    top: 600px;
    left: 1420px;
  }
  /* PC (해상도 1024px)*/
  @media all and (min-width: 1600px) {
    top: 800px;
    left: 1700px;
    width: 50px;
    height: 50px;
  }
`;
export default MainPage;
