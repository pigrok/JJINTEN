import React, { useState, useSelector, useEffect } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, updateDoc, doc, query, getDocs } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [userObj, setUserObj] = useState({});

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "name") {
      setName(value);
    }
  };

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name, photoURL: `http://gravatar.com/avatar/${userCredential.user.email}?d=identicon` });
      // console.log(userCredential.user.email);
    } catch (error) {
      setError(error.message);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        // console.log("data", data);
      });
    };
    fetchData();
  }, []);

  // 데이터 추가하기
  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const newUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          };

          setUserObj((prev) => {
            return [...userObj, newUser];
          });

          const collectionRef = collection(db, "users");

          await addDoc(collectionRef, newUser);
        }
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>회원가입</h2>
      <form>
        <div>
          <label>이메일 : </label>
          <input type="email" value={email} name="email" onChange={onChange} required></input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <input type="password" value={password} name="password" onChange={onChange} required></input>
        </div>
        <div>
          <label>닉네임 : </label>
          <input type="name" value={name} name="name" onChange={onChange} required></input>
        </div>
        <p>{error}</p>
        <button onClick={signUp}>회원가입</button>
        <button onClick={signIn}>로그인</button>
      </form>
    </div>
  );
};

export default Auth;
