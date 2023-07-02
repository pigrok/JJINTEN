import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/modules/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { signInWithGoogle, signInWithGithub } from "../firebase";
import logoPic from "../assets/logo_nuki.png";
import gitLogo from "../assets/git.png";
import googleLogo from "../assets/google.png";

function Login({ loginModal, setSignUpModal, setLoginModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // 입력값 받기
  const onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  // 로그인 버튼
  const loginButtonHandler = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(
        loginSuccess({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          note: null,
          lastSignTime: user.metadata.lastSignInTime,
        })
      );
      alert("로그인 성공 ^_-");
      setLoginModal(false);
    } catch (error) {
      const errorMessage = error.message;
      dispatch(
        loginFailure({
          error: errorMessage,
        })
      );
      alert(`로그인 실패: ${errorMessage}`);
    }
  };

  // 창닫기 버튼
  const xButtonHandler = () => {
    setLoginModal(false);
  };

  // 회원가입 모달 띄우기
  const signUpButtonHandler = () => {
    setLoginModal(false);
    setSignUpModal(true);
  };

  // 구글로그인
  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;
      dispatch(
        loginSuccess({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          note: null,
          lastSignTime: user.metadata.lastSignInTime,
        })
      );
      alert("로그인 성공 ^_-");
      setLoginModal(false);
    } catch (error) {
      const errorMessage = error.message;
      dispatch(
        loginFailure({
          error: errorMessage,
        })
      );
      alert("로그인 실패 >_^");
    }
  };

  // 깃헙 로그인
  const handleGithubLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithGithub();
      const user = userCredential.user;
      dispatch(
        loginSuccess({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          note: null,
          lastSignTime: user.metadata.lastSignInTime,
        })
      );
      alert("로그인 성공 ^_-");
      setLoginModal(false);
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      dispatch(
        loginFailure({
          error: errorMessage,
        })
      );
      alert("로그인 실패 >_^");
    }
  };
  return (
    <>
      {loginModal ? (
        <StModalBox>
          <StModalContent>
            <StbackButton onClick={xButtonHandler}>X</StbackButton>
            <LogoContainer>
              <LogoImg src={logoPic} style={{ marginLeft: "5px" }} />
              {/* <LogoSlogan>JJINTEN</LogoSlogan> */}
            </LogoContainer>
            <MainContainer>
              <InputBox type="email" placeholder="이메일을 입력해주세요." value={email} name="email" onChange={onChangeHandler} required />
              <InputBox type="password" placeholder="비밀번호를 입력해주세요." value={password} name="password" onChange={onChangeHandler} required />
              <div style={{ marginTop: "15px", marginBottom: "15px" }}>아이디 찾기 | 비밀번호 찾기</div>
              <StButton backgroundColor="#BD0965" border="#BD0965" color="white" onClick={loginButtonHandler}>
                로그인
              </StButton>
              <StButton backgroundColor="white" border="#BD0965 1px solid" color="#BD0965" onClick={signUpButtonHandler}>
                회원가입
              </StButton>
              <div style={{ marginTop: "20px", marginBottom: "15px" }}>소셜로 로그인하기</div>
              <SocialButton onClick={handleGoogleLogin}>
                <img style={{ width: "44px", height: "44px", margin: "10px" }} src={googleLogo} />
              </SocialButton>
              <SocialButton onClick={handleGithubLogin}>
                <img style={{ width: "46px", height: "46px", margin: "10px" }} src={gitLogo} />
              </SocialButton>
            </MainContainer>
          </StModalContent>
        </StModalBox>
      ) : (
        <></>
      )}
    </>
  );
}

// 스타일 영역
const StModalBox = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
`;

const StModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 380px;
  height: 600px;
  border-radius: 10px;
`;

const StbackButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: white;
  font-size: 15px;
  margin: 5px;
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 100px;
  height: 100px;
`;

const LogoSlogan = styled.div`
  font-size: 30px;
`;

const MainContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const InputBox = styled.input`
  width: 282px;
  height: 50px;
  margin: 5px;
  padding-left: 10px;
  font-size: 15px;
  display: inline-block;
  outline: none;

  &:focus {
    border: 2px solid #bd0965;
    border-radius: 3px;
  }
`;

const StButton = styled.button`
  width: 300px;
  height: 50px;
  margin: 5px;
  cursor: pointer;
  font-size: 15px;
  border-radius: 3px;
  border: ${({ border }) => border};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
`;

const SocialButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: white;
`;

export default Login;
