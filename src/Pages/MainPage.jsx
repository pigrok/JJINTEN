import React, { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import styled from "styled-components";
import NewCardContainer from "../components/NewCardContainer";
import NewsCardContainer from "../components/NewCardContainer";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Form from "../components/Form";

function MainPage() {
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const state = useSelector((state) => state.auth);

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

  return (
    <MainPageWrapper>
      <Signup signUpModal={signUpModal} setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <Login setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <LeftContainer>
        <MenuBar></MenuBar>
      </LeftContainer>
      <RightContainer>
        <WriteSection onClick={openFormModal}>글쓰기✏️</WriteSection>
        <Form formModal={formModal} setFormModal={setFormModal} />
        <SortSection>
          <SortButton onClick={openLoginModal}>조회수순</SortButton>
          <SortButton>좋아요순</SortButton>
          <SortButton>댓글순</SortButton>
        </SortSection>
        <CardSection>
          <NewsCardContainer />
        </CardSection>
      </RightContainer>
    </MainPageWrapper>
  );
}

export default MainPage;

const MainPageWrapper = styled.div`
  display: grid;
  grid-template-columns: 150px 1150px;
`;

const LeftContainer = styled.div`
  -webkit-box-align: center;
  align-items: center;
  text-align: center;
`;

const MenuBar = styled.div`
  width: 150px;
  height: 500px;
  margin-top: 100px;
  margin-right: 50px;
  border: 1px solid black;
  position: fixed;
`;

const RightContainer = styled.div`
  display: grid;
  width: 100%;
  grid-row-gap: 10px;
  grid-template-rows: 30px 30px auto;
`;

const WriteSection = styled.div`
  height: 30px;
  border: 1px solid black;
  grid-gap: 20px;
  cursor: pointer;
`;

const SortSection = styled.div`
  height: 30px;
  border: 1px solid black;
  text-align: right;
`;

const CardSection = styled.div`
  height: 30px;
  border: 1px solid black;
  height: 1000px;
`;

const SortButton = styled.button`
  height: 100%;
  width: 100px;
`;

const GoUpButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50% 50%;
  position: fixed;
  border: 1px solid black;
  left: 1400px;
  top: 600px;
`;
