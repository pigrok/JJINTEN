import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTodo, setTodos, updateTodo } from "../redux/modules/todos";
import { addDoc, collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { addComments, setComments } from "../redux/modules/comments";
import shortid from "shortid";
import Login from "../components/Login";
import Signup from "../components/Signup";

function Detail() {
  // 로그인 및 회원가입 모달 띄우기
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const todos = useSelector((state) => state.todos);
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.auth.user);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");

  const { id } = useParams();
  const todo = todos.find((todo) => todo.id === id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const todos = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt;
          return { id: doc.id, ...data, createdAt };
        });
        dispatch(setTodos(todos));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTodos(todos));
  }, [dispatch, todos]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = await query(collection(db, "comments"), where("postId", "==", id));
        const querySnapshot = await getDocs(q);
        const comments = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data };
        });
        console.log(comments);
        dispatch(setComments(comments));
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(setComments(comments));
  }, [dispatch, comments]);

  const deleteTodoHandler = async () => {
    try {
      const q = query(collection(db, "todos"), where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await deleteDoc(docRef);
        dispatch(deleteTodo(id));

        navigate("/");
      } else {
        console.log("해당 id를 가진 문서를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodoHandler = async () => {
    try {
      if (!title || !body) {
        alert("제목과 내용을 입력해주세요.");
        return;
      }

      const q = query(collection(db, "todos"), where("id", "==", todo.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const updatedData = {
          title: title,
          body: body,
          updatedAt: new Date().toString(),
          isModified: true,
        };
        await updateDoc(docRef, updatedData);
        const updatedTodo = { ...todo, ...updatedData };
        dispatch(updateTodo(updatedTodo));
        setEdit(false);
      } else {
        console.log("해당 id를 가진 문서를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setLoginModal(true);
    } else if (!contents) {
      alert("필수값이 누락되었습니다. 확인해주세요.");
      return;
    }

    try {
      const data = {
        id: shortid.generate(),
        contents: contents,
        updatedAt: new Date().toString(),
        isModified: true,
        postId: todo.id,
        uid: user.uid,
        writer: user.displayName,
        profile: user.photoURL,
      };

      await addDoc(collection(db, "comments"), data);

      // Firebase에 댓글 추가 후에 새로운 댓글 목록을 가져와서 Redux 상태를 업데이트
      // dispatch(fetchComments());
      console.log("comments before dispatch:", data);
      dispatch(addComments(data));

      setName("");
      setContents("");
    } catch (error) {
      console.error("데이터 추가 에러:", error);
    }
  };

  // const handleCommentDelete = (commentId) => {
  //   // 삭제할 댓글의 ID를 제외한 나머지 댓글들로 새로운 배열을 생성하여 업데이트
  //   const updatedComments = comments.filter((comment) => comment.id !== commentId);

  //   // 업데이트된 댓글 배열을 Redux 상태에 반영
  //   dispatch(setComments(updatedComments));
  // };

  const modifiedDateCard = (todo) => {
    if (todo && todo.isModified) {
      return todo.updatedAt;
    } else if (todo && !todo.isModified) {
      return todo.createdAt;
    } else {
      return "";
    }
  };

  const compareDateComment = (a, b) => {
    const aDate = new Date(modifiedDateComment(a));
    const bDate = new Date(modifiedDateComment(b));
    return bDate - aDate;
  };

  const modifiedDateComment = (comment) => {
    if (comment && comment.isModified) {
      return comment.updatedAt;
    } else if (comment && !comment.isModified) {
      return comment.createdAt;
    } else {
      return "";
    }
  };

  // 로그인 상태면 작성, 로그인 안 한 상태면 로그인 모달창 띄우기
  // const writeCommentButtonHandler = () => {
  //   if (!user) {
  //     setLoginModal(true);
  //   } else {
  //     handleCommentSubmit();
  //   }
  // };

  return (
    <div>
      <Login setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <Signup signUpModal={signUpModal} setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>{modifiedDateCard(todo)}</div>

          <div style={{ marginRight: "550px" }}>
            {edit ? (
              <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={updateTodoHandler}>
                저장
              </button>
            ) : (
              <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={() => setEdit(true)}>
                수정
              </button>
            )}
            <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={deleteTodoHandler}>
              삭제
            </button>
          </div>
        </div>
      </div>
      <div style={{ padding: "10px", margin: "10px", width: "1000px", height: "500px" }}>
        <div style={{ border: "1px solid black", textAlign: "center" }}>
          <p>title: {todo?.title}</p>
          {edit && <input value={title} onChange={(e) => setTitle(e.target.value)} />}
        </div>
        <div style={{ border: "1px solid black", marginTop: "20px", height: "400px" }}>
          <p>body: {todo?.body}</p>
          {edit && <textarea value={body} onChange={(e) => setBody(e.target.value)} />}
        </div>
      </div>
      <div>
        <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
          <form onSubmit={handleCommentSubmit}>
            <h3>댓글</h3>
            <br />
            <input
              name="댓글"
              value={contents}
              onChange={(e) => {
                setContents(e.target.value);
              }}
            />
            <button type="submit">작성</button>
          </form>
        </div>
        <div>
          {comments.sort(compareDateComment).map((comment) => (
            <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }} key={comment?.id}>
              <img style={{ height: "50px", width: "50px" }} src={comment.profile}></img>
              <p>{comment.writer}</p>
              <p>content: {comment.contents}</p>
              <p>작성일자: {modifiedDateComment(comment)}</p>
              {/* <button onClick={() => handleCommentDelete(comment.id)}>삭제</button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Detail;
