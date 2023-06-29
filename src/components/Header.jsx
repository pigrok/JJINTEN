import React from "react";
import { styled } from "styled-components";
import logoPic from "../assets/logo_nuki.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const state = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  // console.log(user);

  const navigate = useNavigate();

  const clickToMainPage = () => {
    navigate(`/`);
  };

  const clickToMyPage = () => {
    navigate(`/mypage/${user.uid}`);
  };

  // // 데이터 가져오기
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const q = query(collection(db, "users"));
  //     const querySnapshot = await getDocs(q);

  //     querySnapshot.forEach((doc) => {
  //       const data = {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //       setNickname(data.displayName);
  //       setProfilePic(data.photoURL);
  //       setUid(data.uid);

  //       // console.log(data.displayName);
  //     });
  //   };
  //   fetchData();
  // }, []);

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LeftSection onClick={clickToMainPage}>
          <ImgBox>
            <LogoImg src={logoPic} />
          </ImgBox>
          <LogoSpan>JJINTEN</LogoSpan>
        </LeftSection>
        <RightSection>
          {state.user ? (
            <ProfileContainer onClick={clickToMyPage}>
              <span>{user.displayName}님</span>
              <ProfileImg src={user.photoURL} alt="Uploaded" />
              <span style={{ fontSize: "20px" }}>▾</span>
            </ProfileContainer>
          ) : (
            "로그인 해주세요"
          )}
        </RightSection>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;

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
