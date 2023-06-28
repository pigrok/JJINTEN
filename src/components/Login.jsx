import React, { useEffect } from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeLogin } from "../redux/modules/loginModal";
import { openSignUp } from "../redux/modules/signUpModal";
import { login } from "../redux/modules/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isOpenLogin = useSelector((state) => state.loginModal.isOpen);

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

  // 로그인
  const loginButtonHandler = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  // 창닫기
  const xButtonHandler = () => {
    dispatch(closeLogin());
  };

  // 회원가입 모달 띄우기
  const signUpButtonHandler = () => {
    dispatch(closeLogin());
    dispatch(openSignUp());
  };

  return (
    <>
      {isOpenLogin ? (
        <StModalBox>
          <StModalContent>
            <button onClick={xButtonHandler}>X</button>
            <div>로그인 하세요</div>
            <mian>
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
            </mian>
            <sub>
              <div>아직 계정이 없으신가요?</div>
              <button onClick={signUpButtonHandler}>회원가입</button>
            </sub>
            <sub>
              <div>소셜로 가입하기</div>
              <button>구글</button>
              <button>깃헙</button>
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 30%;
  height: 50%;
  border-radius: 12px;
`;
