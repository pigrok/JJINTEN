import React from "react";
import styled from "styled-components";
import interparkLogo from "../assets/interpark_ticket.png";
import yesLogo from "../assets/yes24_ticket.png";
import melonLogo from "../assets/melon_ticket.png";
import timeticketLogo from "../assets/time_ticket.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <StFooter>
        <BannerContainer>
          <BannerImgBox>
            <Link to={`https://ticket.interpark.com/`}>
              <BannerImg src={interparkLogo} />
            </Link>
            <Link to={`http://ticket.yes24.com/`}>
              <BannerImg src={yesLogo} />
            </Link>
            <Link to={`https://ticket.melon.com/main/index.htm`}>
              <BannerImg src={melonLogo} />
            </Link>
            <Link to={`https://timeticket.co.kr/`}>
              <BannerImg src={timeticketLogo} />
            </Link>
            {/* <Img src={postLogo} /> */}
          </BannerImgBox>
        </BannerContainer>
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

const StFooter = styled.footer`
  width: 100%;
  height: 200px;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-top: 50px;
  bottom: 0;
`;

const FooterItemGroup = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const FooterItem = styled.div`
  color: gray;
  font-size: 13px;
  margin-bottom: 10px;
  text-align: center;
`;
const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  /* border: 1px solid black; */
`;

const Img = styled.img``;

const BannerImgBox = styled.div`
  display: flex;
`;

const BannerImg = styled.img`
  width: 200px;
  height: 50px;
  padding: 10px 30px;
`;
