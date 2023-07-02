import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import logoPic from "../assets/logo_nuki.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";
import { signOut } from "firebase/auth";
import { logOutSuccess } from "../redux/modules/auth";
import { auth } from "../firebase";

function Header() {
  const state = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  // 프로필 메뉴 열기
  const [isOpen, setIsOpen] = useState(false);
  // 로그인 모달 열기
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  // 로고 애니메이션
  const [displayLogo, setDisplayLogo] = useState(false);

  const [showButtons, setShowButtons] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 마이페이지 이동
  const clickToMyPage = () => {
    navigate(`/mypage/${user.uid}`);
  };

  // 로그아웃
  const logOut = async (event) => {
    event.preventDefault();

    navigate("/");

    await signOut(auth);
    dispatch(logOutSuccess());
  };

  // 로그인 모달 열기
  const openLoginModal = () => {
    if (!state.user) {
      setLoginModal(true);
    }
  };

  // 로고 변화 애니메이션
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayLogo((prev) => !prev);

      // return () => {
      //   clearInterval(timer);
      // };
    }, 3000);
  }, []);

  return (
    <>
      <Login setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <SignUp signUpModal={signUpModal} setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <HeaderWrapper>
        <HeaderContainer>
          <LeftSection>
            {displayLogo ? (
              <ImgBox onClick={() => window.location.replace("/")}>
                <LogoImg src={logoPic} />
              </ImgBox>
            ) : (
              <p onClick={() => window.location.replace("/")}>찐텐으로 즐겨라</p>
            )}
          </LeftSection>
          <RightSection>
            {state.user ? (
              <ProfileContainer onClick={() => setIsOpen((prev) => !prev)}>
                <span>{user.displayName}님</span>
                <ProfileImg src={user.photoURL} alt="Uploaded" />
                <span style={{ fontSize: "20px" }}>▾</span>
                {isOpen && (
                  <ProfileMenu>
                    <li>
                      <ProfileMenuBtn onClick={clickToMyPage}>마이페이지</ProfileMenuBtn>
                    </li>
                    <li>
                      <ProfileMenuBtn onClick={logOut}>로그아웃</ProfileMenuBtn>
                    </li>
                  </ProfileMenu>
                )}
              </ProfileContainer>
            ) : (
              <div onClick={openLoginModal}>로그인 해주세요</div>
            )}
          </RightSection>
        </HeaderContainer>
      </HeaderWrapper>
    </>
  );
}

export default Header;

const HeaderWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
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
  font-size: 18px;
`;
const ProfileImg = styled.img`
  margin: 5px;
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50% 50%;
  margin-left: 10px;
`;

const ProfileMenu = styled.ul`
  position: absolute;
  top: 80%;
  right: 0%;
  width: 120px;
  height: 125px;
  list-style: none;
  /* border: 1px solid gray; */
  background-color: #ffffff;
  box-shadow: 0px 0px 8px #83838365;
  padding: 0;
  z-index: 1;
`;

const ProfileMenuBtn = styled.button`
  width: 100%;
  font-size: 18px;
  text-align: left;
  line-height: 40px;
  border: none;
  background-color: #ffffff;
  padding: 10px;
  cursor: pointer;
`;
