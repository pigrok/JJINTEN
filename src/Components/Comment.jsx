import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { deleteComment, updateComment } from "../redux/modules/comments";
import { commentDeleteHandlerDB } from "../util/comment";
function Comment({ post, user, comment, comments, commentContents, id, commentId, updatedAt, isModified, postId, uid, writer, profile }) {
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [editContents, setEditContents] = useState(false);

  const dispatch = useDispatch();

  const commentDeleteHandler = async (commentId) => {
    await commentDeleteHandlerDB(commentId, postId);
    dispatch(deleteComment(commentId));
  };

  const updateCommentHandler = async (commentId) => {
    try {
      if (!contents) {
        alert("내용을 입력해주세요.");
        return;
      }
      const q = query(collection(db, "comments"), where("id", "==", commentId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const updatedComment = {
          contents: contents,
          updatedAt: new Date().toString(),
          isModified: true,
          id: commentId,
          uid: user.uid,
          profile: user.photoURL,
          writer: user.displayName,
          postId: post.id,
        };
        await updateDoc(docRef, updatedComment);
        console.log("a", comments);
        dispatch(updateComment(updatedComment));
        console.log("b", comments);

        setEditContents(false);
        setContents("");
      } else {
        console.log("해당 id를 가진 문서를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.log(error);
    }
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

  const isPostCreatedByCurrentUser = user && comment && user.uid === comment.uid;
  console.log("is", isPostCreatedByCurrentUser);
  console.log(comment);

  return (
    <div>
      <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }} key={id}>
        <img style={{ height: "50px", width: "50px" }} src={profile}></img>
        <p>{writer}</p>
        <p>content: {commentContents} </p>
        <p>작성일자: {modifiedDateComment(comment)}</p>

        {isPostCreatedByCurrentUser ? (
          <>
            {editContents ? (
              <div>
                <textarea value={contents} onChange={(e) => setContents(e.target.value)} style={{ width: "100%", minHeight: "100px", marginBottom: "10px" }} />
                <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={() => updateCommentHandler(id)}>
                  저장
                </button>
              </div>
            ) : (
              <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={() => setEditContents(true)}>
                수정
              </button>
            )}
            <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={() => commentDeleteHandler(id)}>
              삭제
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default Comment;
