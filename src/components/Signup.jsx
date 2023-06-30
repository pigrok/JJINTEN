import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { signUpFailure } from "../redux/modules/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Signup({ signUpModal, setSignUpModal, setLoginModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setCheckPassword] = useState("");
  const [name, setName] = useState("");
  const [caution, setCaution] = useState("");
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
    // if (email && password && checkpassword && !name) {
    //   alert("닉네임도 입력해라-_-");
    // }
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
      alert(`회원가입 실패: ${errorMessage}`);
    }
  };

  // 비밀번호 확인
  useEffect(() => {
    if (password.length !== 6) {
      setCaution("비밀번호는 최소 6자리로 입력해주세요");
    } else if (password !== checkpassword) {
      setCaution("비밀번호가 일치하지 않습니다.");
    } else {
      setCaution("");
    }
  }, [password, checkpassword]);

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
              <span>{caution}</span>
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

export default Signup;
