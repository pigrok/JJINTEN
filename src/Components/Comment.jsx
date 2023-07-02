import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { deleteComment, updateComment } from "../redux/modules/comments";
import { styled } from "styled-components";
import { commentDeleteHandlerDB } from "../util/comment";

function Comment({ post, user, comment, comments, commentContents, commentNumber, id, commentId, updatedAt, isModified, postId, uid, writer, profile }) {
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
      <div key={id}>
        <CommentBox style={{ display: "flex", alignItems: "center" }}>
          <ProfileImg src={profile}></ProfileImg>
          <CommentWriter>{writer}</CommentWriter>
        </CommentBox>
        <CommentDate>{commentContents} </CommentDate>
        <div>
          <p>{processCreatedAt(modifiedDateComment(post))}</p>
          {isPostCreatedByCurrentUser ? (
            <>
              {editContents ? (
                <div>
                  <EditCommentTextarea value={contents} onChange={(e) => setContents(e.target.value)} />
                </div>
              ) : (
                <></>
              )}
              {editContents ? (
                <div>
                  <FeatureButton onClick={() => updateCommentHandler(id)}>저장</FeatureButton>
                </div>
              ) : (
                <div>
                  <FeatureButton onClick={() => setEditContents(true)}>수정</FeatureButton>
                  <FeatureButton onClick={() => commentDeleteHandler(id)}>삭제</FeatureButton>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
export default Comment;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
`;

const CommentWriter = styled.p`
  margin: 15px;
  font-size: 12px;
`;

const CommentDate = styled.p`
  margin: 15px;
  font-size: 12px;
`;

const EditCommentTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  margin-bottom: 10px;
  word-wrap: break-word;
  font-size: 17px;
`;

const FeatureButton = styled.button`
  border: 1px solid #ffffff;
  width: 50px;
  height: 20px;
  background-color: transparent;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50% 50%;
  margin-left: 10px;
`;
