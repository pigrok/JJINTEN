import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, updateProfile } from "firebase/auth";
import FileUpload from "../components/FileUpload";
import MyPost from "../components/MyPost";
import { logOutSuccess, updateDisplayName } from "../redux/modules/auth";
import { styled } from "styled-components";

const MyPage = () => {
  const state = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [note, SetNote] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async (event) => {
    event.preventDefault();

    navigate("/");

    await signOut(auth);
    dispatch(logOutSuccess());
  };

  const onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "newDisplayName") {
      setNewDisplayName(value);
    }
    if (name === "note") {
      SetNote(value);
    }
  };

  const onSubmitNote = (event) => {
    event.preventDefault();
  };

  const onSubmitDisName = (event) => {
    event.preventDefault();

    // 기존 닉네임과 변경할 닉네임이 다를 때만 실행
    if (state.displayName !== newDisplayName) {
      updateName();
      setNewDisplayName("");
    }
  };

  // 닉네임 업데이트
  const updateName = async (user) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });

      dispatch(updateDisplayName(newDisplayName));
    } catch (error) {
      console.log(error);
    }
  };

  const clickOpenCloseModal = () => setIsOpen((prev) => !prev);

  return (
    <>
      <main
        style={{
          border: "1px solid black",
          margin: "10px",
          padding: "10px",
        }}
      >
        <button onClick={logOut}>로그아웃</button>
        <p></p>
        <button onClick={clickOpenCloseModal}>수정</button>
        {isOpen && (
          <ModalBox>
            <ModalContents>
              <button onClick={clickOpenCloseModal}>닫기</button>
              <h2>프로필 수정</h2>
              <form onSubmit={onSubmitDisName}>
                <input value={newDisplayName} onChange={onChangeHandler} name="newDisplayName" type="text" placeholder="닉네임 변경"></input>
                <input type="submit" value="Update DisplayName"></input>
              </form>
              <form onSubmit={onSubmitNote}>
                <input value={note} onChange={onChangeHandler} name="note" type="text" placeholder="한 줄 소개 ..."></input>
                <input type="submit" value="Update Note"></input>
              </form>
              <FileUpload />
            </ModalContents>
          </ModalBox>
        )}
        <h2>프로필</h2>
        <ProfileContainer>
          <ProfilePic src={state.photoURL} alt="Uploaded" />
          <ProfileInfo>
            <p>닉네임 : {state.displayName}</p>
            <p>{state.email}</p>
            <p>팔로우 ?????? </p>
            <p>한 줄 소개 : {note}</p>
          </ProfileInfo>
        </ProfileContainer>

        <h2>내가 작성한 게시글</h2>
        <MyPost />
        <h2>내가 좋아요한 게시글</h2>
      </main>
    </>
  );
};

export default MyPage;

const ModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #dededec9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContents = styled.div`
  position: relative;
  width: 40%;
  height: 45%;
  background-color: #ffffff;
  border-radius: 15px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rem;
`;

const ProfilePic = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 20px;
`;

const ProfileInfo = styled.div`
  width: 400px;
  height: 400px;
  background-color: #dfdfdf;
  border-radius: 20px;
`;
