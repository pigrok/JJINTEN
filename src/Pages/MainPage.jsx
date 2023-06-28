import React from "react";
import NewsCard from "../Components/NewsCard";
import { styled } from "styled-components";
import NewCardContainer from "../Components/NewCardContainer";
import NewsCardContainer from "../Components/NewCardContainer";
import { useDispatch } from "react-redux";
import { openLogin } from "../redux/modules/loginModal";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

function MainPage() {
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
  const WriteSEction = styled.div`
    height: 30px;
    border: 1px solid black;
    grid-gap: 20px;
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

  const dispatch = useDispatch();

  const loginModalHandler = () => {
    dispatch(openLogin());
    console.log("sdfsfsf");
  };

  return (
    <MainPageWrapper>
      <Login />
      <Signup />
      <LeftContainer>
        <MenuBar></MenuBar>
      </LeftContainer>
      <RightContainer>
        <WriteSEction onClick={loginModalHandler}>글쓰기✏️</WriteSEction>
        <SortSection>
          <SortButton>조회수순</SortButton>
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
