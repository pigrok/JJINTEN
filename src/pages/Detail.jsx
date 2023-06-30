import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, setPosts, updatePost } from "../redux/modules/posts";
import { addDoc, collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { addComments, setComments } from "../redux/modules/comments";
import shortid from "shortid";
import Comment from "../components/Comment";

function Detail() {
  const posts = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.auth.user);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [category, setCategory] = useState("");

  const { id } = useParams();
  const post = posts.find((post) => post.id === id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const posts = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt;
          return { id: doc.id, ...data, createdAt };
        });
        dispatch(setPosts(posts));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPosts(posts));
  }, [dispatch, posts]);

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

  const deletePostHandler = async () => {
    try {
      const q = query(collection(db, "posts"), where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await deleteDoc(docRef);
        dispatch(deletePost(id));

        navigate("/");
      } else {
        console.log("해당 id를 가진 문서를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePostHandler = async () => {
    try {
      if (!title || !body) {
        alert("제목과 내용을 입력해주세요.");
        return;
      }

      const q = query(collection(db, "posts"), where("id", "==", post.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const updatedData = {
          category:
            category === "category1"
              ? "문화"
              : category === "category2"
              ? "전시"
              : category === "category3"
              ? "공연"
              : category === "category4"
              ? "연극"
              : category === "category5"
              ? "뮤지컬"
              : category === "category6"
              ? "페스티벌"
              : "",
          title: title,
          body: body,
          updatedAt: new Date().toString(),
          isModified: true,
        };
        await updateDoc(docRef, updatedData);
        const updatedPost = { ...post, ...updatedData };
        dispatch(updatePost(updatedPost));
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

    if (!contents) {
      alert("필수값이 누락되었습니다. 확인해주세요.");
      return;
    }

    try {
      const data = {
        id: shortid.generate(),
        contents: contents,
        updatedAt: new Date().toString(),
        isModified: true,
        postId: post.id,
        uid: user.uid,
        writer: user.displayName,
        profile: user.photoURL,
      };

      await addDoc(collection(db, "comments"), data);

      dispatch(addComments(data));

      setName("");
      setContents("");
    } catch (error) {
      console.error("데이터 추가 에러:", error);
    }
  };

  const modifiedDateCard = (post) => {
    if (post && post.isModified) {
      return post.updatedAt;
    } else if (post && !post.isModified) {
      return post.createdAt;
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

  const isPostCreatedByCurrentUser = user && post && user.uid === post.uid;

  return (
    <div>
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>{modifiedDateCard(post)}</div>

          <div style={{ marginRight: "550px" }}>
            {isPostCreatedByCurrentUser ? (
              <>
                {edit ? (
                  <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={updatePostHandler}>
                    저장
                  </button>
                ) : (
                  <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={() => setEdit(true)}>
                    수정
                  </button>
                )}
                <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={deletePostHandler}>
                  삭제
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div style={{ padding: "10px", margin: "10px", width: "1000px", height: "500px" }}>
        <div style={{ border: "1px solid black" }}>
          <p style={{ display: "flex", alignItems: "center" }}>
            category:{" "}
            {edit ? (
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="category1">문화 </option>
                <option value="category2">전시</option>
                <option value="category3">공연</option>
                <option value="category4">연극</option>
                <option value="category5">뮤지컬</option>
                <option value="category6">페스티벌</option>
              </select>
            ) : (
              <p>{post?.category}</p>
            )}
          </p>
        </div>
        <div style={{ border: "1px solid black", textAlign: "center" }}>
          <p>title: {post?.title}</p>
          {edit && <input value={title} onChange={(e) => setTitle(e.target.value)} />}
        </div>
        <div style={{ border: "1px solid black", marginTop: "20px", height: "400px" }}>
          <p>body: {post?.body}</p>
          {edit && <textarea value={body} onChange={(e) => setBody(e.target.value)} />}
        </div>
      </div>

      <div>
        {" "}
        <br />
        <br />
        <br />
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
        {comments.sort(compareDateComment).map((comment) => {
          return (
            <Comment
              key={comment.id}
              user={user}
              id={comment.id}
              uid={comment.uid}
              postId={comment.postId}
              commentId={comment.commentId}
              writer={comment.writer}
              profile={comment.profile}
              post={post}
              comment={comment}
              updatedAt={comment.updatedAt}
              isModified={comment.isModified}
              commentContents={comment.contents}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Detail;
