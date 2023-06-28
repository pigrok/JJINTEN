import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import FileUpload from "../Components/FileUpload";

const MyPage = () => {
  const { user } = useSelector((state) => {
    return state.users;
  });

  const [userObj, setUserObj] = useState({});
  const [newDisplayName, setNewDisplayName] = useState("");

  const navigate = useNavigate();

  const logOut = async (event) => {
    event.preventDefault();

    await signOut(auth);

    navigate("/");
  };
  console.log(user);
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "newDisplayName") {
      setNewDisplayName(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  // 데이터 변경하기
  // const updateDisplayName = async () => {
  //   const dnRef = doc(db, "users", user.displayName);
  //   await updateDoc(dnRef, { ...userObj, displayName: newDisplayName });

  //   setUserObj((prev) => ({
  //     ...prev,
  //     displayName: "change name",
  //   }));
  // };
  // console.log(newDisplayName);

  // const updateDisplayName = async (user) => {
  //   try {
  //     await user.updateProfile({
  //       displayName: "Your Name",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <header
        style={{
          border: "1px solid black",
          margin: "10px",
          padding: "10px",
        }}
      >
        JJINTEN
      </header>
      <main
        style={{
          border: "1px solid black",
          margin: "10px",
          padding: "10px",
        }}
      >
        <p>'{user.displayName}'의 프로필입니다.</p>
        <p>이 사람의 email은 '{user.email}'입니다.</p>
        <button onClick={logOut}>로그아웃</button>
        <form onSubmit={onSubmit}>
          <input value={newDisplayName} onChange={onChange} name="newDisplayName" type="text" placeholder="Display Name"></input>
          <input type="submit" value="Update Profile"></input>
          <FileUpload />
        </form>
      </main>
      <footer
        style={{
          border: "1px solid black",
          margin: "10px",
          padding: "10px",
        }}
      >
        푸터입니다.
      </footer>
    </>
  );
};

export default MyPage;
