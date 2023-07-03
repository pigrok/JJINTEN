import React from "react";
import styled from "styled-components";

const StFooter = styled.footer`
  width: 100%;
  height: 150px;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  bottom: 0;
`;

const FooterItemGroup = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 60px;
`;

const FooterItem = styled.div`
  color: gray;
  font-size: 13px;
  margin-bottom: 10px;
  text-align: center;
`;

function Footer() {
  return (
    <>
      <StFooter>
        <FooterItemGroup>
          <FooterItem>Creators | 강현수 김민규 나윤빈 장혜진 조성록</FooterItem>
          <FooterItem>Link | 인터파크 예스24 멜론티켓 타임티켓</FooterItem>
          <FooterItem>Reference | 벨로그 오늘의집 인터파크 티스토리</FooterItem>
          <FooterItem>찐텐소개 | 인사채용 | 이용약관 | 고객센터 | ⓒ JJINTEN Corp.</FooterItem>
        </FooterItemGroup>
      </StFooter>
    </>
  );
}

export default Footer;
