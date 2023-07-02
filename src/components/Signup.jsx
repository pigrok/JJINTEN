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
  const [isCheckingBox, setIsCheckingBox] = useState(false);
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

  // 필수 체크
  const onchangeCheckBox = (event) => {
    if (event.target.checked) {
      setIsCheckingBox(true);
    } else {
      setIsCheckingBox(false);
    }
  };

  // 뒤로가기 버튼
  const backButtonHandler = () => {
    setSignUpModal(false);
    setLoginModal(true);
  };

  // 창닫는 버튼
  const xButtonHandler = () => {
    setSignUpModal(false);
  };

  // 회원가입 버튼
  const signUpButtonHandler = async (event) => {
    event.preventDefault();
    if (email && password && checkpassword && !name) {
      alert("닉네임도 입력해라-_-");
      return;
    }
    if (!isCheckingBox) {
      alert("개인 정보 수집에 동의 부탁드려욤");
      return;
    }
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
    if (checkpassword.length >= 6 && password !== checkpassword) {
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
            <StbackButton onClick={xButtonHandler}>X</StbackButton>
            <InputContainer>
              <h2 style={{ marginBottom: "30px" }}>회원가입</h2>
              <div>
                <InputLabel>이메일</InputLabel>
                <InputBox type="email" placeholder="이메일" value={email} name="email" onChange={onChangeHandler} required />
              </div>
              <div>
                <InputLabel>비밀번호</InputLabel>
                <div style={{ margin: "5px", color: "gray", fontSize: "15px" }}>비밀번호는 최소 6자리로 입력해주세요.</div>
                <InputBox type="password" placeholder="비밀번호" value={password} name="password" onChange={onChangeHandler} required />
              </div>
              <div>
                <InputLabel>비밀번호 확인</InputLabel>
                <div style={{ margin: "5px", color: "#bd0965" }}>{caution}</div>
                <InputBox type="password" placeholder="비밀번호 확인" value={checkpassword} name="checkpassword" onChange={onChangeHandler} required />
              </div>
              <div>
                <InputLabel>닉네임</InputLabel>
                <InputBox type="name" placeholder="닉네임" value={name} name="name" onChange={onChangeHandler} required />
              </div>
              <InputLabel style={{ width: "300px", marginTop: "10px" }}>약관동의</InputLabel>
              <div style={{ width: "300px", margin: "10px" }}>
                <input type="checkbox" style={{ accentColor: "#bd0965" }} /> <span>[선택] 이용약관</span>
                {/* <div style={{ width: "300px", height: "50px" }}>찐텐에 회원가입 신청하시는 당신의 정보 좀 수집할게요. 1개월 뒤에 삭제 해드립니다. ^_-</div> */}
              </div>
              <div style={{ width: "300px" }}>
                <input type="checkbox" onClick={onchangeCheckBox} style={{ accentColor: "#bd0965" }} /> <span>[필수] 개인정보수집 및 이용동의</span>
                {/* <div style={{ width: "300px", height: "50px" }}>찐텐으로 즐길 사람만 모십니다. 아니면 어쩔 수 없구요. 여러분의 선택입니다. ^-^</div> */}
              </div>
              <StMainButton onClick={signUpButtonHandler}>회원가입</StMainButton>
            </InputContainer>
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
  width: 420px;
  height: 700px;
  border-radius: 10px;
`;

const StbackButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: white;
  font-size: 15px;
  margin: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InputLabel = styled.div`
  margin: 5px 5px 5px 5px;
  font-weight: bold;
`;

const InputBox = styled.input`
  width: 300px;
  height: 30px;
  margin: 5px 5px 10px;
  padding-left: 10px;
  font-size: 15px;
  display: inline-block;
  outline: none;

  &:focus {
    border: 2px solid #bd0965;
    border-radius: 3px;
  }
`;

const StMainButton = styled.button`
  width: 300px;
  height: 50px;
  margin: 30px;
  cursor: pointer;
  font-size: 15px;
  border-radius: 3px;
  background-color: #bd0965;
  border: #bd0965;
  color: white;
`;

export default Signup;
