import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/* @font-face {
    font-family: 'SUIT-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
} */
/* @font-face {
    font-family: 'IBMPlexSansKR-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
} */
/* @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
.notosanskr * { 
 font-family: 'Noto Sans KR', sans-serif;
} */
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
/* @font-face {
    font-family: 'YESGothic-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_13@1.0/YESGothic-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}   */
body {
    /* font-family: 'SUIT-Regular'; */
    /* font-family: 'IBMPlexSansKR-Regular'; */
    /* font-family: 'Noto Sans KR', sans-serif; */
    font-family: 'Pretendard-Regular';
    /* font-family: 'YESGothic-Regular'; */
  }
`;

export default GlobalStyle;
