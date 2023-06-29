import { styled } from "styled-components";
const Button = styled.button`
  height: 30px;
  cursor: pointer;
  border: 1px solid black;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  border-radius: 20px 20px 20px 20px;
  transition: all 0.125s ease-in 0s;
  background-color: #ffffff;
  &:hover {
    background: #212529;
    color: #ffffff;
  }
`;

export default Button;
