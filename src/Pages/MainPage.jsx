import React from "react";
import { styled } from "styled-components";
import NewsCardContainer from "../components/NewCardContainer";
import { useDispatch } from "react-redux";
import { openLogin } from "../redux/modules/loginModal";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Form from "../components/Form";
import Button from "../components/Button";

function MainPage() {
  const dispatch = useDispatch();

  const loginModalHandler = () => {
    dispatch(openLogin());
  };
  const sortByView = () => {};
  const sortByLike = () => {};
  const sortByComment = () => {};
  return (
    <>
      <Login />
      <Signup />
      <MainPageWrapper>
        <LeftContainer>
          <MenuBar></MenuBar>
        </LeftContainer>
        <RightContainer>
          <WriteSection onClick={loginModalHandler}>글쓰기✏️</WriteSection>
          <Form />
          <SortSection>
            <SortButton onClick={sortByView}>조회수순</SortButton>
            <SortButton onClick={sortByLike}>좋아요순</SortButton>
            <SortButton onClick={sortByComment}>댓글순</SortButton>
          </SortSection>
          <CardSection>
            <NewsCardContainer />
          </CardSection>
        </RightContainer>
      </MainPageWrapper>
      <GoUpButton>▲</GoUpButton>
    </>
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
const MenuBar = styled.div`
  width: 100px;
  height: 500px;
  top: 200px;
  border: 1px solid black;
  position: fixed;
`;
const RightContainer = styled.div`
  display: grid;
  width: 100%;
  grid-row-gap: 10px;
  grid-template-rows: 30px 30px auto;
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
