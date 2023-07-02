import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where, getDoc, addDoc } from "firebase/firestore";
import shortid from "shortid";
import { likeDB, unLikeDB, fetchLikeDB, didIPressed } from "../util/like";
import { like, unlike, fetchLike } from "../redux/modules/like";
import { db } from "../firebase";
import { deleteTodo, setTodos, updateTodo } from "../redux/modules/todos";
import { addComment } from "../util/comment";
import { addComments, setComments } from "../redux/modules/comments";
import { increaseViewDB } from "../util/post";
function Detail() {
  const todos = useSelector((state) => state.todos);
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.auth.user);
  const likeNumber = useSelector((state) => state.like);
  // useState를 사용하여 로컬 상태 변수를 정의
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [contents, setContents] = useState("");

  const { id } = useParams();
  const todo = todos.find((todo) => todo.id === id);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function fetchLikeAsync() {
    const fetchedlike = await fetchLikeDB(id);
    dispatch(fetchLike(fetchedlike.likeNumber));
    setIsLike(didIPressed(fetchedlike.likePeople, user ? user.uid : null));
  }
  async function fetchData() {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const todos = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt;
        return { id: doc.id, ...data, createdAt };
      });
      dispatch(setTodos(todos));
    } catch (error) {
      console.log(error);
    }
  }
  async function increaseView() {
    await increaseViewDB(id);
  }
  useEffect(() => {
    fetchLikeAsync();
    fetchData();
    increaseView();
  }, [dispatch]);

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
  }, [dispatch]);

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

  const onClickLike = async (e) => {
    if (!user) return;
    e.preventDefault();
    const userId = user.uid;
    const todoId = id;
    if (likeDB(userId, todoId)) {
      dispatch(like());
      setIsLike(!isLike);
    }
  };
  const onClickUnLike = async (e) => {
    if (!user) return;
    e.preventDefault();
    const userId = user.uid;
    const todoId = id;
    if (unLikeDB(userId, todoId)) {
      dispatch(unlike());
      setIsLike(!isLike);
    }
  };
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!contents) {
      alert("필수값이 누락되었습니다. 확인해주세요.");
      return;
    }
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
    await addComment(id, data);
    setName("");
    setContents("");
    dispatch(addComments(data));
  };

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

  return (
    <div>
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
            {isLike ? (
              <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={onClickUnLike}>
                ㄴㄴㄴ
              </button>
            ) : (
              <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={onClickLike}>
                좋아요
              </button>
            )}

            <span>{likeNumber}</span>
            <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={() => navigate("/")}>
              이전 화면으로
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
