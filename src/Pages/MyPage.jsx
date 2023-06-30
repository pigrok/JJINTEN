import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, updateProfile } from "firebase/auth";
import FileUpload from "../components/FileUpload";
import MyPost from "../components/MyPost";
import { logOutSuccess, updateDisplayName, updateProfileNote } from "../redux/modules/auth";
import { styled } from "styled-components";

const MyPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [edit, setEdit] = useState(false); // 수정 토글
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

  // 수정 버튼 토글
  const editToggle = () => {
    setEdit((prev) => !prev);
  };

  // 프로필 수정 핸들러
  const profileEditHandler = (event) => {
    event.preventDefault();
    if (newDisplayName && note) {
      dispatch(updateProfileNote(note));

      // 기존 닉네임과 변경할 닉네임이 다를 때만 실행
      if (user.displayName !== newDisplayName) {
        updateName();
      }
      setEdit(false);
    } else {
      alert("내용을 입력해주세요");
    }
  };

  // 닉네임 업데이트 - Authentication
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

  // 시간 변형
  const processCreatedAt = (dateString) => {
    const date = new Date(Date.parse(dateString));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    const formattedDate = `${year}년${month}월${day}일 ${hour}시${minute}분`;

    return formattedDate;
  };

  return (
    <main
      style={{
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
      }}
    >
      <button onClick={logOut}>로그아웃</button>
      <p></p>
      <button onClick={editToggle}>프로필 수정</button>
      <ProfileContainer>
        <div>
          <ProfilePic src={user.photoURL} alt="Uploaded" />
          {edit && <FileUpload edit={edit} setEdit={setEdit} />}
        </div>
        <ProfileInfo>
          {edit ? (
            <form>
              닉네임 : <input value={newDisplayName} onChange={onChangeHandler} name="newDisplayName" type="text" placeholder="닉네임 ..." autoComplete="off"></input>
              {/* <input type="submit" value="Update DisplayName"></input> */}
            </form>
          ) : (
            <p>닉네임 : {user.displayName}</p>
          )}
          <p>이메일 : {user.email}</p>
          {edit ? (
            <form>
              한 줄 소개 : <input value={note} onChange={onChangeHandler} name="note" type="text" placeholder="한 줄 소개 ..." autoComplete="off"></input>
              {/* <input type="submit" value="Update Note"></input> */}
              <br />
              <button onClick={profileEditHandler}>저장</button>
            </form>
          ) : (
            <p>한 줄 소개 : {user.note}</p>
          )}
          <p>마지막 로그인 시간 : {processCreatedAt(user.lastSignTime)}</p>
        </ProfileInfo>
      </ProfileContainer>
      <h2>내가 작성한 게시글</h2>
      <MyPost />
      <h2>내가 좋아요한 게시글</h2>
    </main>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rem;
`;

const ProfilePic = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
`;

const ProfileInfo = styled.div`
  width: 400px;
  height: 400px;
  background-color: #dfdfdf;
  border-radius: 20px;
`;

export default MyPage;
