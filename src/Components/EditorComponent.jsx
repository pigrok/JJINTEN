import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";

function EditorComponent({ setBody }) {
  const editorRef = useRef();

  useEffect(() => {
    if (editorRef.current && editorRef.current.editor) {
      editorRef.current.editor.editing.view.change((writer) => {
        writer.setStyle("height", "300px", editorRef.current.editor.editing.view.document.getRoot());
      });
    }
  }, []);

  return (
    <EditorWrapper>
      <CKEditor
        editor={ClassicEditor}
        config={
          {
            // CKEditor 구성 옵션 설정 (선택사항)
          }
        }
        onReady={(editor) => {
          // 에디터가 준비되었을 때 호출되는 콜백 함수
          editor.setData("내용을 입력하세요");
        }}
        onChange={(event, editor) => {
          // 에디터 내용이 변경되었을 때 호출되는 콜백 함수
          const data = editor.getData();
          setBody(data);
        }}
        ref={editorRef}
      />
    </EditorWrapper>
  );
}

export default EditorComponent;

// 스타일 영역
const EditorWrapper = styled.div`
  .ck-editor__editable {
    height: 300px;
  }
`;
