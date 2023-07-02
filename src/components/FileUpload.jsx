import { ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { auth, storage } from "../firebase";
import { getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePic } from "../redux/modules/auth";
import { styled } from "styled-components";

const FileUpload = ({ edit, setEdit }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);

    const downloadURL = await getDownloadURL(imageRef);
    // 프로필 사진 업데이트
    await updateProfile(auth.currentUser, {
      photoURL: downloadURL,
    });
    dispatch(updateProfilePic(downloadURL));
    setEdit(false);
  };

  return (
    <>
      {edit && (
        <div>
          <FileUploadInput type="file" onChange={handleFileSelect} />
          <FileUploadBtn onClick={handleUpload}>이미지 업로드</FileUploadBtn>
        </div>
      )}
    </>
  );
};

export default FileUpload;

const FileUploadInput = styled.input`
  position: absolute;
  bottom: 7%;
  left: 8%;
  width: 170px;
`;

const FileUploadBtn = styled.button`
  position: absolute;
  bottom: 7%;
  left: 32%;
  width: 86px;
  height: 25px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  background-color: #747474;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #3b3b3b;
  }
`;
