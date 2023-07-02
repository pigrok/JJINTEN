import React from "react";
import { styled } from "styled-components";
import interparkLogo from "../assets/interpark_ticket.png";
import yesLogo from "../assets/yes24_ticket.png";
import melonLogo from "../assets/melon_ticket.png";
import timeticketLogo from "../assets/time_ticket.png";
import { Link } from "react-router-dom";

const LinkBanner = () => {
  return (
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
      </BannerImgBox>
    </BannerContainer>
  );
};

export default LinkBanner;

const BannerContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  /* border: 1px solid black; */
`;

const BannerImgBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const BannerImg = styled.img`
  width: 360px;
  height: 110px;
  padding: 10px 30px;
`;
