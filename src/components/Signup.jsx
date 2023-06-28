import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/modules/auth";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { closeSignUp } from "../redux/modules/signUpModal";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const isOpenSignUp = useSelector((state) => state.signUpModal.isOpen);

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
    if (name === "name") {
      setName(value);
    }
  };

  // 회원가입
  const signUpButtonHandler = (event) => {
    event.preventDefault();
    dispatch(signUp(email, password));
  };

  const backButtonHandler = () => {
    dispatch(closeSignUp());
  };

  const user = useSelector((state) => state.users.user);

  return (
    <>
      {isOpenSignUp ? (
        <StModalBox>
          <StModalContent>
            <button onClick={backButtonHandler}>뒤로가기</button>
            <main>
              <div>
                <label>이메일: </label>
                <input type="email" value={email} name="email" onChange={onChangeHandler} required />
              </div>
              <div>
                <label>비밀번호: </label>
                <input type="password" value={password} name="password" onChange={onChangeHandler} required />
              </div>
              <div>
                <label>비밀번호 확인: </label>
                <input type="password" required />
              </div>
              <div>
                <label>닉네임: </label>
                <input type="name" value={name} name="name" onChange={onChangeHandler} required />
              </div>
            </main>
            <sub>
              <div>개인정보 동의</div>
              <div>마케팅 동의</div>
            </sub>
            <button onClick={signUpButtonHandler}>회원가입</button>
          </StModalContent>
        </StModalBox>
      ) : (
        <></>
      )}
    </>
  );
}

export default Signup;

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
