import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsCardContainer from "../components/NewsCardContainer";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Form from "../components/Form";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { FiSearch } from "react-icons/fi";

function MainPage() {
  const state = useSelector((state) => state.auth);
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("전체");
  const categories = ["전체", "페스티벌", "연극", "뮤지컬", "전시", "공연", "콘서트"];

  const onChangeSearch = (e) => {
    setSearchInputValue(e.target.value);
  };
  const sortByView = () => {
    setSortBy("views");
  };
  const sortByLike = () => {
    setSortBy("likeNumber");
  };
  const sortByComment = () => {
    setSortBy("commentNumber");
  };
  return (
    <MainPageWrapper>
      <SignUp signUpModal={signUpModal} setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <Login setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <LeftContainer>
        <CategoryMenuBar>
          {categories.map((category) => {
            return (
              <p
                style={{ cursor: "pointer" }}
                key={category}
                onClick={() => {
                  console.log(category);
                  setCategory(category);
                }}
              >
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
        <input onChange={onChangeSearch} value={searchInputValue} />
        <button
          onClick={() => {
            setSearchText(searchInputValue);
          }}
        >
          검색
        </button>
        <SortSection>
          <SortButton onClick={sortByView}>조회수순</SortButton>
          <SortButton onClick={sortByLike}>좋아요순</SortButton>
          <SortButton onClick={sortByComment}>댓글순</SortButton>
        </SortSection>
        <CardSection>
          <NewsCardContainer category={category} sortBy={sortBy} searchText={searchText} />
        </CardSection>
      </RightContainer>
    </MainPageWrapper>
  );
}

const MainPageWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px minmax(300px, 1250px) 50px;
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

const SortSection = styled.div`
  height: 45px;
  text-align: right;
  margin-right: 5px;
`;
const SearchSection = styled.div`
  height: 45px;
  text-align: right;
  /* margin-right: 170px; */
  margin-top: 10px;
`;

const CardSection = styled.div`
  height: auto;
  width: 100%;
`;

const InputBox = styled.input`
  width: 130px;
  height: 28px;
  padding-left: 10px;
  font-size: 14px;
  display: inline-block;
  border: none;
  border-radius: 25px;
  outline: none;

  /* &:focus {
    border: 1px solid #bd0965;
    border-radius: 25px;
    outline: none;
  } */
`;

const Stbutton = styled.button`
  background-color: #fff;
  border: none;
  font-size: 20px;
  margin-top: 5px;
`;

const SortButton = styled.button`
  width: 70px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
  color: gray;
  font-size: 14px;
  border-radius: 25px;
  background-color: #fff;
  border: 1px solid gray;

  &:hover {
    background-color: gray;
    color: #fff;
  }
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
