import React, { useState } from "react";
import { styled } from "styled-components";
import logoPic from "../assets/logo_nuki.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Login";
import Signup from "./Signup";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { logOutSuccess } from "../redux/modules/auth";

function Header() {
  const state = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  // console.log(user);

  const navigate = useNavigate();

  const clickToMainPage = () => {
    navigate(`/`);
  };

  const clickToMyPage = () => {
    navigate(`/mypage/${user.uid}`);
  };

  // 로그인 모달 열기
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const openLoginModal = () => {
    if (!state.user) {
      setLoginModal(true);
    }
  };

  // 로그아웃 호버
  const [logoutHover, setLogoutHover] = useState(false);
  const logoutHoverHandler = () => {
    setLogoutHover(true);
  };

  // 로그아웃 버튼
  const dispatch = useDispatch();
  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
    dispatch(logOutSuccess());
  };

  return (
    <HeaderWrapper>
      <Login setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <Signup signUpModal={signUpModal} setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <HeaderContainer>
        <LeftSection onClick={clickToMainPage}>
          <ImgBox>
            <LogoImg src={logoPic} />
          </ImgBox>
          <LogoSpan>JJINTEN</LogoSpan>
        </LeftSection>
        <RightSection>
          {state.user ? (
            <ProfileContainer onClick={clickToMyPage}>
              <span>{user.displayName}님</span>
              <ProfileImg src={user.photoURL} alt="Uploaded" />
            </ProfileContainer>
          ) : (
            <div onClick={openLoginModal}>로그인 해주세요</div>
          )}
          <span style={{ fontSize: "20px" }} onClick={logoutHoverHandler}>
            ▾
          </span>
          {state.user && logoutHover && <button onClick={logOut}>로그아웃</button>}
        </RightSection>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  text-align: -webkit-center;
`;
const HeaderContainer = styled.div`
  width: 95%;
  height: 70px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;
const LeftSection = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;
const RightSection = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
`;
const ImgBox = styled.div`
  width: 70px;
  height: 70px;
  margin: 0 auto;
`;
const LogoImg = styled.img`
  width: 100%;
  height: 100%;
`;
const ProfileContainer = styled.div`
  display: flex;
  cursor: pointer;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  height: 80%;
`;
const ProfileImg = styled.img`
  margin: 5px;
  width: 40px;
  height: auto;
  border-radius: 50% 50%;
`;
const LogoSpan = styled.span`
  font-size: 30px;
`;
