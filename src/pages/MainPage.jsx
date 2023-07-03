import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsCardContainer from "../components/NewsCardContainer";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Form from "../components/Form";
import Button from "../components/Button";
import LinkBanner from "../components/LinkBanner";
import { PiMicrophoneStageDuotone } from "react-icons/pi";
import { MdOutlineFestival, MdOutlineDensitySmall } from "react-icons/md";
import { GiTheaterCurtains } from "react-icons/gi";
import { FaTheaterMasks } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import { BsMusicNoteBeamed } from "react-icons/bs";
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
  const categories = [
    { category: "전체", icon: <MdOutlineDensitySmall size="40" /> },
    { category: "연극", icon: <GiTheaterCurtains size="40" /> },
    { category: "페스티벌", icon: <MdOutlineFestival size="40" /> },
    { category: "뮤지컬", icon: <FaTheaterMasks size="40" /> },
    { category: "전시", icon: <AiOutlinePicture size="40" /> },
    { category: "클래식", icon: <BsMusicNoteBeamed size="40" /> },
    { category: "콘서트", icon: <PiMicrophoneStageDuotone size="40" /> },
  ];

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
    <>
      <SearchSection>
        <InputBox placeholder="검색어를 입력해주세요" onChange={onChangeSearch} value={searchInputValue} />
        <Stbutton
          onClick={() => {
            setSearchText(searchInputValue);
          }}
        >
          <FiSearch />
        </Stbutton>
      </SearchSection>
      <MainPageWrapper>
        <SignUp signUpModal={signUpModal} setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
        <Login setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
        <LeftContainer></LeftContainer>
        <RightContainer>
          <LinkBanner></LinkBanner>
          <CategoryMenuBar>
            {categories.map((c) => {
              return (
                <CategoryBox key={c.category} onClick={() => setCategory(c.category)}>
                  <CategoryItem>{c.icon}</CategoryItem>
                  <CategoryItem>{c.category}</CategoryItem>
                </CategoryBox>
              );
            })}
          </CategoryMenuBar>
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
    </>
  );
}

const MainPageWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px minmax(300px, 1250px) 50px;
`;
const LeftContainer = styled.div`
  /* -webkit-box-align: center;
  align-items: center;
  text-align: center; */
  text-align: center;
`;

const RightContainer = styled.div`
  /* display: inline; */
  width: 100%;
  /* grid-row-gap: 10px;
grid-template-rows: 30px 30px auto; */
`;

const CategoryMenuBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px 20px 0px;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryItem = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
  cursor: pointer;
`;

const SortSection = styled.div`
  height: 45px;
  text-align: right;
  margin-right: 5px;
`;
const SearchSection = styled.div`
  height: 45px;
  text-align: right;
  margin-right: 170px;
  margin-top: 10px;
`;

const CardSection = styled.div`
  height: auto;
  width: 100%;
  margin-top: 50px;
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
`;

const Stbutton = styled.button`
  background-color: #fff;
  border: none;
  font-size: 20px;
  margin-top: 5px;
`;

const SortButton = styled.button`
  width: 80px;
  height: 30px;
  /* margin-right: 10px; */
  cursor: pointer;
  color: gray;
  font-size: 14px;
  border-radius: 25px;
  background-color: #fff;
  border: 1px solid gray;
  margin: 40px 5px;

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
