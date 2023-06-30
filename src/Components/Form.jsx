<<<<<<< HEAD
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
=======
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
>>>>>>> 8067bcf6f2d57d4653728eb92dfeaeb2a7dcc60a
import { db } from "../firebase";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import { addPost } from "../redux/modules/posts";
import { styled } from "styled-components";
import { auth, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Form({ formModal, setFormModal }) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [downloadURL, setDownloadURL] = useState("");
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  // 사진 업로드
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // 입력
  const handleSubmit = async (event) => {
    event.preventDefault();

    const imageRef = ref(storage, `${auth.currentUser.uid}/form/${selectedFile}`);
    await uploadBytes(imageRef, selectedFile);

    const fileURL = await getDownloadURL(imageRef);
    setDownloadURL(fileURL);

    if (!title || !body || !category) {
      alert("필수값이 누락되었습니다. 확인해주세요.");
      return;
    }

    try {
      const data = {
        id: shortid.generate(),
        category: category,
        title: title,
        body: body,
        createdAt: new Date().toString(),
        isModified: false,
        fileURL: fileURL,
        uid: user.uid,
        writer: user.displayName,
      };
<<<<<<< HEAD
      await addDoc(collection(db, "posts"), data);
=======
      await addDoc(collection(db, "todos"), data);
>>>>>>> 8067bcf6f2d57d4653728eb92dfeaeb2a7dcc60a
      await setDoc(doc(db, "likes", data.id), {
        likeNumber: 0,
        likePeople: [],
      });
<<<<<<< HEAD

      dispatch(addPost(data));
=======
      dispatch(addTodo(data));
>>>>>>> 8067bcf6f2d57d4653728eb92dfeaeb2a7dcc60a
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
                  <option value="페스티벌">페스티벌</option>
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
              <div>
                <input type="file" onChange={handleFileSelect} />
              </div>
              <button type="submit">작성</button>
              <button onClick={cancelButtonHandler}>취소</button>
            </form>
          </StModalContent>
        </StModalBox>
      ) : (
        <> </>
      )}
    </>
  );
}

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

export default Form;
