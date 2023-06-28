import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../Components/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

const Home = () => {
  const [init, setInit] = useState(false);
  const { user } = useSelector((state) => {
    return state.users;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // if (user) {
      //   setUserObj({
      //     displayName: user.displayName,
      //     uid: user.uid,
      //     // updateProfile: (args) => user.updateProfile(args),
      //   });
      // } else {
      //   setUserObj(null);
      // }

      if (user) {
        dispatch({
          type: "ADD_USER",
          payload: user,
        });
        setInit(true);
      }
      // console.log("user =>", user.email);
      console.log("user =>", user);
    });
  }, []);

  return (
    <>
      {init ? (
        <Link to={`/mypage/${user.uid}`}>
          <button>로그인 정보</button>
        </Link>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Home;
