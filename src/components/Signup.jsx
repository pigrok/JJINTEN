import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { signUpFailure } from "../redux/modules/auth";
import { onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

/*
 * 1. 회원가입 모달창을 연다
 * 2. 회원가입 입력값을 받는다. (email, pw, nickname, photoURL)
 * 3. 회원가입 버튼을 누른다
 * 4. 회원가입 버튼을 누르면 -> 파이어베이스의 Authentication에 저장한다 (createUserWithEmailAndPassword & updateProfile)
 * 5. 회원가입 완료 알림창을 띄운다
 * 6. 모달창을 닫는다
 * 7. 로그인 모달창을 연다
 * 8. 로그인 한다 (email, pw)
 * 9. 로그인 완료 알림 후 로그인 모달창을 닫는다.
 * 10. 유저가 로그인하고 있다는 사실을 어딘가에 저장한다. => redux (localStorage)
 * 11. 유저 정보를 페이지 우측 상단에 표시한다
 */

function Signup({ signUpModal, setSignUpModal, setLoginModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setCheckPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

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
    if (name === "checkpassword") {
      setCheckPassword(value);
    }
    if (name === "name") {
      setName(value);
    }
  };

  // 뒤로가기 버튼
  const backButtonHandler = () => {
    setSignUpModal(false);
    setLoginModal(true);
  };

  // 회원가입 버튼
  const signUpButtonHandler = async (event) => {
    event.preventDefault();
    try {
      // 여기서 비동기 처리
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: `http://gravatar.com/avatar/${userCredential.user.email}?d=identicon`,
      });

      // 데이터 동기화
      alert("회원가입 완료 ^_-");
      setSignUpModal(false);
      setLoginModal(true);
    } catch (error) {
      const errorMessage = error.message;
      dispatch(
        signUpFailure({
          error: errorMessage,
        })
      );
      alert("회원가입 실패 >_^");
    }
  };

  return (
    <>
      {signUpModal ? (
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
                <input type="password" value={checkpassword} name="checkpassword" onChange={onChangeHandler} required />
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
  backdrop-filter: blur(8px); /* 배경에 blur 효과 적용 */
`;

const StModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 30%;
  height: 50%;
  border-radius: 12px;
`;
