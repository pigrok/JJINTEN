import React from "react";
import { styled } from "styled-components";
import logoPic from "../assets/logo_nuki.png";
import profilePic from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
function Header() {
  const HeaderWrapper = styled.div`
    width: 100%;
    text-align: -webkit-center;
  `;
  const HeaderContainer = styled.div`
    width: 95%;
    height: 70px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
  `;
  const LeftSection = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    cursor: pointer;
  `;
  const RightSection = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
  `;
  const ImgBox = styled.div`
    width: 70px;
    height: 70px;
    margin: 0 auto;
  `;
  const LogoImg = styled.img`
    width: 100%;
    height: 100%;
  `;
  const ProfileContainer = styled.div`
    display: flex;
    cursor: pointer;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    height: 80%;
  `;
  const ProfileImg = styled.img`
    margin: 5px;
    width: 40px;
    height: auto;
    border-radius: 50% 50%;
  `;
  const LogoSpan = styled.span`
    font-size: 30px;
  `;

  const navigate = useNavigate();

  const clickToMinPage = () => {
    navigate(`/`);
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LeftSection onClick={clickToMinPage}>
          <ImgBox>
            <LogoImg src={logoPic} />
          </ImgBox>
          <LogoSpan>JJINTEN</LogoSpan>
        </LeftSection>
        <RightSection>
          <ProfileContainer>
            <span>김민규님</span>
            <ProfileImg src={profilePic} />
            <span style={{ fontSize: "20px" }}>▾</span>
          </ProfileContainer>
        </RightSection>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;
