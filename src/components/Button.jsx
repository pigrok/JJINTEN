import React from "react";
import { styled } from "styled-components";
function Button() {
  const Button = styled.button`
    margin: 0;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-family: "Noto Sans KR", Courier New;
    font-size: 12px;
    padding: 10px;
    border-radius: 5px;
    color: #000000;

    &:hover {
      background: #dddddd;
    }

    &:disabled {
      cursor: default;
      opacity: 0.5;
      background: #ffffff;
    }
  `;
  return <Button />;
}

export default Button;
