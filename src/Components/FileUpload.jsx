import { ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { auth, storage } from "../firebase";
import { getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePic } from "../redux/modules/auth";

const FileUpload = ({ edit, setEdit }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(edit);

  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);

    const downloadURL = await getDownloadURL(imageRef);
    console.log("downloadURL", downloadURL);

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
          <input type="file" onChange={handleFileSelect} />
          <button onClick={handleUpload}>저장</button>
        </div>
      )}
    </>
  );
};

export default FileUpload;
