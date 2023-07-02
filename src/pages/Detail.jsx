import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where, addDoc } from "firebase/firestore";
import shortid from "shortid";
import { likeDB, unLikeDB, fetchLikeDB, didIPressed } from "../util/like";
import { like, unlike, fetchLike } from "../redux/modules/like";
import { db } from "../firebase";
import { deletePost, setPosts, updatePost } from "../redux/modules/posts";
import { addComment } from "../util/comment";
import { increaseViewDB } from "../util/post";
import { addComments, setComments } from "../redux/modules/comments";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { auth, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Comment from "../components/Comment";
import { styled } from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuSave } from "react-icons/lu";
import { LuShare2, LuSiren } from "react-icons/lu";
import { Link } from "react-router-dom";
import EditorComponent from "../components/EditorComponent";

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
  async function fetchLikeAsync() {
    const fetchedlike = await fetchLikeDB(id);
    console.log(fetchedlike);
    console.log(user);
    console.log(likeNumber);
    dispatch(fetchLike(fetchedlike.likeNumber));
    setIsLike(didIPressed(fetchedlike.likePeople, user ? user.uid : null));
  }
  async function fetchData() {
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
        dispatch(setComments(comments));
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [dispatch]);

  const deletePostHandler = async () => {
    try {
      const q = query(collection(db, "posts"), where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await deleteDoc(docRef);
        dispatch(deletePost(id));

        navigate("/");
        alert("삭제되었습니다!");
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
        alert("저장되었습니다!");
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
    if (!user) return;
    const userId = user.uid;
    const postId = id;
    if (likeDB(userId, postId)) {
      dispatch(like());
      setIsLike(!isLike);
    }
  };
  const onClickUnLike = async (e) => {
    if (!user) return;
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
    if (!contents) {
      alert("필수값이 누락되었습니다. 확인해주세요.");
      return;
    }
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
    await addComment(id, data);
    window.location.reload();
    setName("");
    setContents("");
    dispatch(addComments(data));
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

  const filteredPosts = posts.filter((p) => {
    if (p?.category === post?.category && p.id !== post.id) {
      return true;
    }
    return false;
  });

  return (
    <div>
      <Login setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <SignUp signUpModal={signUpModal} setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <TitleBarContainer>
        <TitleBar>
          <TitleBox>
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
                <EditTitle>
                  {edit && <input style={{ width: "50%", height: "50px" }} value={title} onChange={(e) => setTitle(e.target.value)} />}
                  {!edit && post?.title}
                </EditTitle>
                <div style={{ display: "flex", alignItems: "center", margin: "5px 0 30px 5px" }}>
                  <div style={{ marginRight: "10px" }}> by.{post?.writer}.</div>
                  <div style={{ marginRight: "10px" }}>{processCreatedAt(modifiedDateCard(post))}</div>
                </div>
              </div>
            </div>
          </TitleBox>
        </TitleBar>
      </TitleBarContainer>
      <Wrapper>
        <Body>
          <div>
            {post && (
              <div style={{ marginBottom: "90px", width: "100%", whiteSpace: "pre-line" }}>
                {!edit ? (
                  <div className="Description" dangerouslySetInnerHTML={{ __html: post.body }}></div>
                ) : (
                  <EditorComponent setBody={setBody} setSelectedFile={setSelectedFile} initData={post.body} />
                )}
              </div>
            )}
          </div>
        </Body>
        <Feature>
          {!isLike ? (
            <FeatureButton onClick={onClickLike}>
              <BsHeart size="23" />
              {likeNumber}
            </FeatureButton>
          ) : (
            <FeatureButton onClick={onClickUnLike}>
              <BsHeartFill color="red" size="23" />
              {likeNumber}
            </FeatureButton>
          )}
          {isPostCreatedByCurrentUser ? (
            <>
              {edit ? (
                <FeatureButton onClick={updatePostHandler}>
                  <LuSave size="23" />
                </FeatureButton>
              ) : (
                <FeatureButton onClick={() => setEdit(true)}>
                  <BiEditAlt size="23" />
                </FeatureButton>
              )}
              <FeatureButton onClick={deletePostHandler}>
                <RiDeleteBin5Line size="23" />
              </FeatureButton>
            </>
          ) : (
            <>
              <CopyToClipboard text={`localhost:3000/${post?.id}/ `}>
                <FeatureButton
                  onClick={() => {
                    alert("공유 주소가 복사되었습니다!");
                  }}
                >
                  <LuShare2 size="23" />
                </FeatureButton>
              </CopyToClipboard>

              <FeatureButton
                onClick={() => {
                  alert("신고 금지!");
                }}
              >
                <LuSiren size="23" />
              </FeatureButton>
            </>
          )}
        </Feature>
        <div>
          <CategoryArticles>[{post?.category}] 카테고리 추천 글</CategoryArticles>
          <Line1 />
          <RelativeArticles>
            {filteredPosts.slice(0, 5).map((filteredPosts) => {
              return (
                <Articles key={filteredPosts.id}>
                  <Link to={`/${filteredPosts.id}`} target="_blank" rel="noopener noreferrer">
                    <NewsCardImage src={filteredPosts.fileURL} />
                    <div>{filteredPosts.title}</div>
                  </Link>
                </Articles>
              );
            })}
          </RelativeArticles>
          <CommentCount>댓글 {post?.commentNumber}</CommentCount>
        </div>
        <div>
          <Line1 />
          <CommentList>
            {comments.sort(compareDateComment).map((comment) => {
              return (
                <div>
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
                    commentNumber={post.commentNumber}
                  />
                  <Line2 />
                </div>
              );
            })}
          </CommentList>
          <CommentForm>
            <form onSubmit={handleCommentSubmit}>
              <CommentProfile>
                <ProfileImg src={user.photoURL}></ProfileImg>
                <CommentProfileName>{user.displayName}</CommentProfileName>
              </CommentProfile>
              <br />
              <CommentInput
                name="댓글"
                value={contents}
                onChange={(e) => {
                  setContents(e.target.value);
                }}
              />
              <FeatureButton type="submit">작성</FeatureButton>
            </form>
            <Line1 />
          </CommentForm>
        </div>
      </Wrapper>
    </div>
  );
}
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

const TitleBox = styled.div`
  margin-left: 200px;
  color: #fdfdef;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BodyForm = styled.div`
  width: 1240px;
  height: 500px;
  white-space: pre-line;
`;

const BodyTextarea = styled.textarea`
  width: 100%;
  height: 600px;
`;

const BodyImage = styled.img`
  width: 300px;
  height: 300px;
`;

const Feature = styled.div`
  border: 1px solid #959595;
  border-color: rgba(185, 185, 185, 0.5);
  border-radius: 15px;
  padding: 9px;
  width: 150px;

  margin-bottom: 50px;
`;

const FeatureButton = styled.button`
  border: 1px solid #ffffff;
  width: 50px;
  height: 20px;
  background-color: transparent;
  font-size: 15px;
`;

const EditTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 40px;
`;

const Wrapper = styled.div`
  // position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 50px;
`;

const CategoryArticles = styled.div`
  /* margin: 20px 0 15px 110px; */
`;

const RelativeArticles = styled.div`
  display: flex;
`;

const Articles = styled.div`
  padding: 20px;
  text-align: center;
`;

const NewsCardImage = styled.img`
  border-radius: 5px 5px 0 0;
  width: 200px;
  height: 200px;
  object-fit: cover;
  display: flex;
  align-items: center;
`;

const CommentCount = styled.div`
  margin-left: 5px;
`;

const Line1 = styled.hr`
  width: 1240px;
  margin: 15px 0 15px 0;
`;

const Line2 = styled.div`
  border-top: 1px dashed black;
  margin: 30px 0 30px 0;
`;

const CommentList = styled.div`
  width: 1240px;
  word-wrap: break-word;
`;
const CommentForm = styled.div`
  margin-top: 40px 0 40px 0;
`;

const CommentProfile = styled.div`
  display: flex;
  align-items: center;
`;

const CommentProfileName = styled.p`
  margin: 15px;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50% 50%;
  margin-left: 10px;
`;

const CommentInput = styled.input`
  width: 100%;
  min-height: 100px;
  margin-bottom: 10px;
  word-wrap: break-word;
  font-size: 17px;
`;
export default Detail;
