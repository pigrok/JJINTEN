import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebase";
import shortid from "shortid";
import "./EditorComponent.css";

function EditorComponent({ setBody, setSelectedFile, initData = "<p>This is some sample content.</p>" }) {
  const editorRef = useRef();
  const [isFirstPicSelected, setIsFirstPicSelected] = useState(false);
  useEffect(() => {
    if (editorRef.current && editorRef.current.editor) {
      editorRef.current.editor.editing.view.change((writer) => {
        writer.setStyle("height", "300px", editorRef.current.editor.editing.view.document.getRoot());
      });
    }
  }, []);

  const imageUpload = async (file) => {
    const imageRef = ref(storage, `${auth.currentUser.uid}/form/${shortid.generate()}_${file}`);
    await uploadBytes(imageRef, file);
    const fileURL = await getDownloadURL(imageRef);
    return fileURL;
  };
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((res, rej) => {
          loader.file.then((file) => {
            imageUpload(file).then((url) => {
              if (!isFirstPicSelected) {
                console.log("들어감");
                setSelectedFile(url);
                setIsFirstPicSelected(true);
              }
              res({ default: url });
            });
          });
        });
      },
    };
  };
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        extraPlugins: [uploadPlugin],
      }}
      onReady={(editor) => {
        editor.setData(initData);
      }}
      onChange={(event, editor) => {
        // 에디터 내용이 변경되었을 때 호출되는 콜백 함수
        const data = editor.getData();
        console.log(data);
        setBody(data);
      }}
      ref={editorRef}
    />
  );
}

export default EditorComponent;
