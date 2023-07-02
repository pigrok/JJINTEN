import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import FileUpload from "../components/FileUpload";
import MyPost from "../components/MyPost";
import MyLikePost from "../components/MyLikePost";
import { updateDisplayName, updateProfileComment } from "../redux/modules/auth";
import { styled } from "styled-components";

const MyPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [edit, setEdit] = useState(false); // 수정 토글
  const [filter, setFilter] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [comment, SetComment] = useState("");

  console.log(filter);

  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "newDisplayName") {
      setNewDisplayName(value);
    }
    if (name === "comment") {
      SetComment(value);
    }
  };

  // 수정 버튼 토글
  const editToggle = () => {
    setEdit((prev) => !prev);
  };

  // 프로필 수정 핸들러
  const profileEditHandler = (event) => {
    event.preventDefault();
    if (newDisplayName && comment) {
      dispatch(updateProfileComment(comment));

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

  const clickViewMyPost = () => {
    setFilter(false);
  };

  const clickViewMyLikePost = () => {
    setFilter(true);
  };

  // 시간 변형
  const processCreatedAt = (dateString) => {
    const date = new Date(Date.parse(dateString));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}시${minute}분`;

    return formattedDate;
  };

  return (
    <ProfileWrapper>
      <ProfileContainer>
        <ProfileEditBtn onClick={editToggle}>{!edit ? "수정" : "취소"}</ProfileEditBtn>
        <ProfileBox>
          <ProfilePicBox>
            <ProfilePic src={user.photoURL} alt="Uploaded" />
            {edit && <FileUpload edit={edit} setEdit={setEdit} />}
          </ProfilePicBox>
          <ProfileInfo>
            {edit ? (
              <p>
                <form>
                  Nickname : <ProfileInfoInput value={newDisplayName} onChange={onChangeHandler} name="newDisplayName" type="text" autoComplete="off" />
                </form>
              </p>
            ) : (
              <p>
                Nickname : <ProfileInfoValue>{user.displayName}</ProfileInfoValue>
              </p>
            )}
            <p>
              E-mail : <ProfileInfoValue>{user.email}</ProfileInfoValue>
            </p>
            {edit ? (
              <p>
                <form>
                  Comment : <ProfileInfoInput value={comment} onChange={onChangeHandler} name="comment" type="text" autoComplete="off" />
                  {edit && <InfoUploadBtn onClick={profileEditHandler}>내용 저장</InfoUploadBtn>}
                </form>
              </p>
            ) : (
              <p>
                Comment : <ProfileInfoValue>{user.comment}</ProfileInfoValue>
              </p>
            )}
            <p>Last Login Time : {processCreatedAt(user.lastSignTime)}</p>
          </ProfileInfo>
        </ProfileBox>
      </ProfileContainer>
      <MyPostContainer>
        <div>
          <MyPostBtn variant={!filter} onClick={clickViewMyPost}>
            작성글
          </MyPostBtn>
          <MyPostBtn variant={filter} onClick={clickViewMyLikePost}>
            좋아요한 글
          </MyPostBtn>
        </div>
        {!filter ? <MyPost /> : <MyLikePost />}
      </MyPostContainer>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  margin-top: 50px;
`;

const ProfileContainer = styled.div`
  position: relative;
  width: 740px;
  height: 350px;
  /* background-color: #e7e7e7a9; */
  border: 1px solid #e1e1e1e0;
  border-radius: 5px;
  box-shadow: 3px 3px 10px #cdcdcddf;
  margin: 0 auto;
  padding: 10px;
`;

const ProfileEditBtn = styled.button`
  position: absolute;
  top: 5%;
  right: 3%;
  width: 70px;
  height: 40px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  background-color: #bd0965;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #7e144b;
    transition: all 0.125s ease-in 0s;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfilePicBox = styled.div`
  padding-right: 50px;
  margin-top: 45px;
`;

const ProfilePic = styled.img`
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ProfileInfo = styled.div`
  line-height: 30px;
  color: #787878;
  border-left: 2px solid #c2c2c2;
  font-size: 15px;
  padding-left: 33px;
  margin-top: 33px;
`;

const ProfileInfoInput = styled.input`
  width: 180px;
  border: 1px solid #c1c1c1;
  border-radius: 10px;
  padding: 8px;
  margin-left: 5px;
`;

const ProfileInfoValue = styled.span`
  color: #000000;
  font-size: 22px;
  font-weight: 500;
`;

const InfoUploadBtn = styled.button`
  position: absolute;
  right: 3%;
  bottom: 7%;
  width: 68px;
  height: 28px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  background-color: #747474;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #3b3b3b;
  }
`;

const MyPostContainer = styled.div`
  margin: 70px 50px 0px 50px;
`;

const MyPostBtn = styled.button`
  width: 130px;
  height: 34px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  margin: 0px 30px 30px 0px;
  transition: all 0.125s ease-in 0s;
  cursor: pointer;

  ${({ variant }) => {
    switch (variant) {
      case false:
        return `
        color: #bd0965;
        background-color: #ffffff;
        border: 2px solid #bd0965;
        `;
      case true:
        return `
        color: #ffffff;
        background-color: #bd0965;
        `;
      default:
        return "";
    }
  }}
`;

export default MyPage;
