import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where, addDoc } from "firebase/firestore";
import shortid from "shortid";
import { likeDB, unLikeDB, fetchLikeDB, didIPressed } from "../util/like";
import { like, unlike, fetchLike } from "../redux/modules/like";
import { db } from "../firebase";
import { deletePost, setPosts, updatePost } from "../redux/modules/posts";
import { addComments, setComments } from "../redux/modules/comments";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { auth, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Comment from "../components/Comment";
import { styled } from "styled-components";

const TitleBarContainer = styled.div`
  width: 100%;
`;

const TitleBar = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  background-color: #cccccc;
`;

function Detail() {
  // 로그인 및 회원가입 모달 띄우기
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const posts = useSelector((state) => state.posts);
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
  const [category, setCategory] = useState("");

  const { id } = useParams();
  const post = posts.find((post) => post.id === id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchLikeAsync() {
      const fetchedlike = await fetchLikeDB(id);
      dispatch(fetchLike(fetchedlike.likeNumber));
      setIsLike(didIPressed(fetchedlike.likePeople, user ? user.uid : null));
    }
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
    fetchLikeAsync();
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
        // console.log(comments);
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
            category === "콘서트"
              ? "콘서트"
              : category === "전시"
              ? "전시"
              : category === "공연"
              ? "공연"
              : category === "연극"
              ? "연극"
              : category === "뮤지컬"
              ? "뮤지컬"
              : category === "페스티벌"
              ? "페스티벌"
              : "",
          title: title,
          body: body,
          updatedAt: new Date().toString(),
          isModified: true,
          fileURL: post.fileURL,
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

  const onClickLike = async (e) => {
    e.preventDefault();
    if (!user) return;
    const userId = user.uid;
    const postId = id;
    if (likeDB(userId, postId)) {
      dispatch(like());
      setIsLike(!isLike);
    }
  };
  const onClickUnLike = async (e) => {
    e.preventDefault();
    if (!user) return;
    const userId = user.uid;
    const postId = id;
    if (unLikeDB(userId, postId)) {
      dispatch(unlike());
      setIsLike(!isLike);
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

  // 사진 업로드
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // 사진 수정
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("파일을 선택해주세요.");
      return;
    }
    const imageRef = ref(storage, `${auth.currentUser.uid}/form/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);

    const downloadURL = await getDownloadURL(imageRef);

    const updatedPost = { ...post, fileURL: downloadURL };
    dispatch(updatePost(updatedPost));

    // 기존 코드 유지
    setSelectedFile(null);
    setFileURL(null);
  };

  const isPostCreatedByCurrentUser = user && post && user.uid === post.uid;

  const processCreatedAt = (dateString) => {
    const date = new Date(Date.parse(dateString));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    const formattedDate = `${year}.${month}.${day}.${hour}.${minute}`;

    return formattedDate;
  };

  return (
    <div>
      <Login setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <SignUp signUpModal={signUpModal} setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <TitleBarContainer>
        <TitleBar>
          <div style={{ marginLeft: "200px", color: "#fdfdef" }}>
            <div>
              {edit ? (
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="콘서트">콘서트 </option>
                  <option value="전시">전시</option>
                  <option value="공연">공연</option>
                  <option value="연극">연극</option>
                  <option value="뮤지컬">뮤지컬</option>
                  <option value="페스티벌">페스티벌</option>
                </select>
              ) : (
                <p>{post?.category}</p>
              )}
            </div>
            <div>
              <div>
                <div style={{ display: "flex", alignItems: "center", fontSize: "30px" }}>
                  {edit && <input style={{ width: "50%", height: "50px" }} value={title} onChange={(e) => setTitle(e.target.value)} />}
                  {!edit && post?.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", margin: "5px 0 30px 5px" }}>
                  <div style={{ marginRight: "10px" }}> by.{post?.writer}.</div>
                  <div style={{ marginRight: "10px" }}>{processCreatedAt(modifiedDateCard(post))}</div>
                  <div>
                    {" "}
                    {isPostCreatedByCurrentUser ? (
                      <>
                        {edit ? (
                          <button style={{ border: "1px solid #cccccc", width: "50px", height: "20px", backgroundColor: "transparent", color: "#fdfdef" }} onClick={updatePostHandler}>
                            저장
                          </button>
                        ) : (
                          <button style={{ border: "1px solid #cccccc", width: "50px", height: "20px", backgroundColor: "transparent", color: "#fdfdef" }} onClick={() => setEdit(true)}>
                            수정
                          </button>
                        )}
                        <button style={{ border: "1px solid #cccccc", width: "50px", height: "20px", backgroundColor: "transparent", color: "#fdfdef" }} onClick={deletePostHandler}>
                          삭제
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TitleBar>
      </TitleBarContainer>
      <div>
        <div>
          {post && (
            <div style={{ border: "1px solid black", marginTop: "70px", width: "100%", height: "500px", whiteSpace: "pre-line" }}>
              {edit && <textarea style={{ width: "100%", height: "600px" }} value={body} onChange={(e) => setBody(e.target.value)} />}
              {!edit && (
                <>
                  {post.fileURL && <img style={{ width: "300px", height: "300px" }} src={post.fileURL} />}
                  <br />
                  {post?.body}
                </>
              )}
            </div>
          )}
        </div>
        <div>
          {edit && (
            <div>
              <input type="file" onChange={handleFileSelect} />
              <button onClick={handleUpload}>Upload</button>
            </div>
          )}
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
