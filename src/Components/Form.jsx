import { addDoc, collection, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { addTodo } from "../redux/modules/todos";
import { styled } from "styled-components";

function Form({ formModal, setFormModal }) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const state = useSelector((state) => state.auth.user);

  console.log(state);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !body) {
      alert("필수값이 누락되었습니다. 확인해주세요.");
      return;
    }

    try {
      const data = {
        id: uuid(),
        category: category,
        title: title,
        body: body,
        isDone: false,
        createdAt: new Date().toString(),
        uid: state.uid,
      };
      await addDoc(collection(db, "todos"), data);
      await setDoc(doc(db, "likes", data.id), {
        likeNumber: 0,
        likePeople: [],
      });
      dispatch(addTodo(data));
      // 입력 필드 초기화
      setCategory("");
      setTitle("");
      setBody("");
      // 입력창 닫기
      setFormModal(false);
    } catch (error) {
      console.error("데이터 추가 에러:", error);
    }
  };

  // 취소 버튼
  const cancelButtonHandler = () => {
    setFormModal(false);
  };

  return (
    <>
      {formModal ? (
        <StModalBox>
          <StModalContent>
            <form onSubmit={handleSubmit}>
              <div>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">select category</option>
                  <option value="문화">문화</option>
                  <option value="전시">전시</option>
                  <option value="공연">공연</option>
                  <option value="연극">연극</option>
                  <option value="뮤지컬">뮤지컬</option>
                </select>
              </div>
              <div>
                <label>제목</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <label>내용</label>
                <input
                  type="text"
                  name="body"
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                ></input>
              </div>
              <button type="submit">작성</button>
            </form>
            <button onClick={cancelButtonHandler}>취소</button>
          </StModalContent>
        </StModalBox>
      ) : (
        <> </>
      )}
    </>
  );
}

export default Form;

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
