import { ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { auth, storage } from "../firebase";
import { getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useSelector((state) => {
    return state.users;
  });

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);

    const downloadURL = await getDownloadURL(imageRef);
    console.log("downloadURL", downloadURL);

    await updateProfile(auth.currentUser, {
      photoURL: downloadURL,
    });
  };

  return (
    <div>
      <h2>프로필 사진 업데이트</h2>
      <img src={user.photoURL} alt="Uploaded" />
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
