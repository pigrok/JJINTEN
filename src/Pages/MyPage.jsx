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

  const [newDisplayName, setNewDisplayName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async (event) => {
    event.preventDefault();

    navigate("/");

    await signOut(auth);
    dispatch(logOutSuccess());
  };

  const onChange = (event) => setNewDisplayName(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();

    // 기존 닉네임과 변경할 닉네임이 다를 때만 실행
    if (state.displayName !== newDisplayName) {
      updateName();
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
        <form onSubmit={onSubmit}>
          <input value={newDisplayName} onChange={onChange} name="newDisplayName" type="text" placeholder="닉네임 변경"></input>
          <input type="submit" value="Update Profile"></input>
        </form>
        <h2>프로필</h2>
        <ProfileContainer>
          <ProfilePic src={state.photoURL} alt="Uploaded" />
          <ProfileInfo>
            <p>닉네임 : {state.displayName}</p>
            <p>{state.email}</p>
          </ProfileInfo>
        </ProfileContainer>
        <FileUpload />
        <h2>내가 작성한 게시글</h2>
        <MyPost />
        <h2>내가 좋아요한 게시글</h2>
      </main>
    </>
  );
};

export default MyPage;

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
