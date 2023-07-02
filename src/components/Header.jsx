import React, { useState } from "react";
import { styled } from "styled-components";
import logoPic from "../assets/logo_nuki.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";
import { logOutSuccess } from "../redux/modules/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Header() {
  const state = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const [showButtons, setShowButtons] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch("");

  const clickToMainPage = () => {
    navigate(`/`);
  };

  const clickToMyPage = () => {
    navigate(`/mypage/${user.uid}`);
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    await signOut(auth);
    dispatch(logOutSuccess());
  };

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };
  // 로그인 모달 열기
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const openLoginModal = () => {
    if (!state.user) {
      setLoginModal(true);
    }
  };

  return (
    <HeaderWrapper>
      <Login setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <SignUp signUpModal={signUpModal} setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <HeaderContainer>
        <LeftSection>
          <a href="/">
            <ImgBox>
              <LogoImg src={logoPic} />
            </ImgBox>
          </a>
          <LogoSpan>JJINTEN</LogoSpan>
        </LeftSection>
        <RightSection>
          {state.user ? (
            <ProfileContainer>
              <span>{user.displayName}님</span>
              <ProfileImg src={user.photoURL} alt="Uploaded" />
              <span style={{ fontSize: "20px" }} onClick={toggleButtons}>
                ▾
              </span>
              <div>
                <button onClick={clickToMyPage}>마이페이지</button>
                <button onClick={handleLogout}>로그아웃</button>
              </div>
            </ProfileContainer>
          ) : (
            <div onClick={openLoginModal}>로그인 해주세요</div>
          )}
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
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50% 50%;
`;
const LogoSpan = styled.span`
  font-size: 30px;
`;
