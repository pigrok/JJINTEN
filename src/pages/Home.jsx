import React from "react";
import Login from "../components/Login";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { openLogin } from "../redux/modules/loginModal";
import Signup from "../components/Signup";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function Home() {
  const dispatch = useDispatch();

  const loginModalHandler = () => {
    dispatch(openLogin());
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "ADD_USER",
          payload: user,
        });
      }
    });
  }, []);

  const { user, isLogin } = useSelector((state) => {
    return state.users;
  });

  return (
    <>
      <Login />
      <Signup />
      <button onClick={loginModalHandler}>로그인</button>
      <Feed onClick={loginModalHandler}>나는 피드!</Feed>
      <button onClick={loginModalHandler}>나는 글쓰기 버튼!</button>
      <div>{user.email}</div>
    </>
  );
}

export default Home;

const Feed = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
`;
