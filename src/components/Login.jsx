import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/modules/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { signInWithGoogle, signInWithGithub } from "../firebase";
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
            <button onClick={xButtonHandler}>X</button>
            <div>로그인 하세요</div>
            <main>
              <div>
                <div>찐텐으로 즐기자!</div>
                <div>로고 이미지</div>
              </div>
              <div>
                <div>
                  <label>이메일 : </label>
                  <input type="email" value={email} name="email" onChange={onChangeHandler} required></input>
                </div>
                <div>
                  <label>비밀번호 : </label>
                  <input type="password" value={password} name="password" onChange={onChangeHandler} required></input>
                </div>
                <button onClick={loginButtonHandler}>로그인</button>
              </div>
            </main>
            <sub>
              <div>아직 계정이 없으신가요?</div>
              <button onClick={signUpButtonHandler}>회원가입</button>
            </sub>
            <sub>
              <div>소셜로 가입하기</div>
              <button onClick={handleGoogleLogin}>구글</button>
              <button onClick={handleGithubLogin}>깃헙</button>
            </sub>
          </StModalContent>
        </StModalBox>
      ) : (
        <></>
      )}
    </>
  );
}

export default Login;

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
  width: 30%;
  height: 50%;
  border-radius: 12px;
`;
