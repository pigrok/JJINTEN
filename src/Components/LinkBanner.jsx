import React from "react";
import { styled } from "styled-components";
import interparkLogo from "../assets/interpark_ticket.png";
import yesLogo from "../assets/yes24_ticket.png";
import melonLogo from "../assets/melon_ticket.png";
import timeticketLogo from "../assets/time_ticket.png";
import { Link } from "react-router-dom";
import postLogo from "../assets/post.jpg";
import Carousel from "./Carousel";

const LinkBanner = () => {
  const images = [
    "http://ticketimage.interpark.com/TCMS4/Main/202304/MainVisual_b2bee53a-59c9-4c2d-a6dd-817a7f96e517.jpg",
    "http://ticketimage.interpark.com/TCMS4/Main/202306/MainVisual_37372c3e-7a4a-4fe5-b23a-760f9093bcc7.jpg",
    "http://ticketimage.interpark.com/TCMS4/Main/202306/MainVisual_9f387a8b-4620-491c-9bfa-359e4f262664.jpg",
    "http://ticketimage.interpark.com/TCMS4/Main/202306/MainVisual_f13a70d7-a620-4018-b039-f3abb6e48f0a.jpg",
    "http://ticketimage.interpark.com/TCMS4/Main/202305/MainVisual_6e8a1c41-87ae-47ed-9d8e-b7fafdf72540.jpg",
    "http://ticketimage.interpark.com/TCMS4/Main/202306/MainVisual_3d0b90ea-9ca1-4fba-b22b-f0528b59d847.jpg",
  ];

  return (
    <BannerContainer>
      <BannerImgBox>
        <Carousel images={images} />
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
  margin-bottom: 80px;
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
