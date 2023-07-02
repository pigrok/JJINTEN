// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import NewsCardContainer from "../components/NewCardContainer";
// import { useSelector } from "react-redux";
// import Login from "../components/Login";
// import SignUp from "../components/SignUp";
// import Form from "../components/Form";
// import Button from "../components/Button";
// import NewsCard from "../components/NewsCard";

// import InfiniteScroll from "react-infinite-scroll-component";

// function MainPage() {
//   const state = useSelector((state) => state.auth);
//   const [loginModal, setLoginModal] = useState(false);
//   const [signUpModal, setSignUpModal] = useState(false);
//   const [formModal, setFormModal] = useState(false);
//   const [category, setCategory] = useState("전체");
//   const categories = ["전체", "페스티벌", "연극", "뮤지컬", "전시", "공연", "콘서트"];
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);

//   const [cardData, setCardData] = useState([]); // 카드 데이터 배열
//   const [dataLength, setDataLength] = useState(0); // 현재까지 로드된 카드 데이터 개수
//   const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부

//   const loadData = async () => {
//     try {
//       const response = await fetch(`API_URL?page=${page}`);
//       const newData = await response.json();
//       setData((prevData) => [...prevData, ...newData]);

//       if (newData.length === 0) {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [page]);

//   const openLoginModal = () => {
//     if (!state.user) {
//       setLoginModal(true);
//     }
//   };

//   const openFormModal = () => {
//     if (!state.user) {
//       setLoginModal(true);
//     } else {
//       setFormModal(true);
//     }
//   };

//   const sortByView = () => {};
//   const sortByLike = () => {};
//   const sortByComment = () => {};

//   const loadMoreCards = () => {
//     // 추가 카드 데이터를 가져오는 로직을 구현해야 합니다.
//     // 예를 들어, API를 호출하여 새로운 데이터를 가져온 후 카드 데이터 배열에 추가합니다.
//     // 이후 setDataLength를 사용하여 현재까지 로드된 카드 데이터 개수를 업데이트합니다.
//     // 더 이상 추가 데이터가 없을 경우 setHasMore(false)로 설정합니다.

//     // API 호출 등의 비동기 작업을 수행할 수 있으므로, Promise를 사용하여 비동기 작업을 처리하는 예시를 제공합니다.
//     // 실제로는 데이터 소스 및 API 호출 방식에 맞게 구현해야 합니다.
//     // 이 예시에서는 setTimeout을 사용하여 1초 후에 더미 데이터를 가져오는 비동기 작업을 수행합니다.

//     return new Promise((resolve) => {
//       setTimeout(() => {
//         // 더미 데이터 예시
//         const newCards = Array.from({ length: 12 }, (_, index) => ({
//           id: dataLength + index + 1,
//           title: `Card ${dataLength + index + 1}`,
//         }));

//         // 기존 카드 데이터에 새로운 카드 데이터를 추가합니다.
//         setCardData((prevData) => [...prevData, ...newCards]);

//         // setDataLength를 사용하여 현재까지 로드된 카드 데이터 개수를 업데이트합니다.
//         setDataLength((prevLength) => prevLength + newCards.length);

//         // 더 이상 추가 데이터가 없을 경우 setHasMore(false)로 설정합니다.
//         if (dataLength >= 64) {
//           setHasMore(false);
//         }

//         resolve(); // Promise를 완료시킵니다.
//       }, 1000); // 1초 후에 더미 데이터를 가져옵니다.
//     });
//   };

//   useEffect(() => {
//     // 초기 카드 데이터 로드 등 초기화 작업을 수행할 수 있습니다.
//     // 예: 첫 번째 16개 카드 데이터를 가져오는 API 호출 및 setDataLength(16) 설정

//     const initialLoad = async () => {
//       try {
//         // 더미 데이터 예시
//         const initialCards = Array.from({ length: 12 }, (_, index) => ({
//           id: index + 1,
//           title: `Card ${index + 1}`,
//         }));

//         // 초기 카드 데이터를 설정합니다.
//         setCardData(initialCards);

//         // setDataLength를 사용하여 현재까지 로드된 카드 데이터 개수를 업데이트합니다.
//         setDataLength(initialCards.length);
//       } catch (error) {
//         console.log("Error occurred while loading initial card data:", error);
//       }
//     };

//     initialLoad();
//   }, []);

//   return (
//     <MainPageWrapper>
//       <SignUp signUpModal={signUpModal} setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
//       <Login setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
//       <LeftContainer>
//         <MenuBar>
//           {categories.map((category) => {
//             return (
//               <p key={category} onClick={() => setCategory(category)}>
//                 {category}
//               </p>
//             );
//           })}
//         </MenuBar>
//       </LeftContainer>
//       <RightContainer>
//         <WriteSection onClick={openFormModal}>글쓰기✏️</WriteSection>
//         <Form formModal={formModal} setFormModal={setFormModal} />
//         <SortSection>
//           <SortButton>조회수순</SortButton>
//           <SortButton>좋아요순</SortButton>
//           <SortButton>댓글순</SortButton>
//         </SortSection>
//         <CardSection>
//           <InfiniteScroll dataLength={dataLength} next={loadMoreCards} hasMore={hasMore} loader={<h4>Loading...</h4>} endMessage={<p>No more items to load.</p>}>
//             {/* 카드 데이터를 사용하여 카드 컴포넌트를 렌더링합니다. */}
//             {cardData.map((card) => (
//               <NewsCard key={card.id} title={card.title} />
//             ))}
//           </InfiniteScroll>
//         </CardSection>
//       </RightContainer>
//     </MainPageWrapper>
//   );
// }

// const MainPageWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 100px minmax(400px, 1250px) 50px;
// `;
// const LeftContainer = styled.div`
//   -webkit-box-align: center;
//   align-items: center;
//   text-align: center;
// `;
// const MenuBar = styled.div`
//   width: 80px;
//   height: 500px;
//   top: 200px;
//   border: 1px solid black;
//   position: fixed;
// `;
// const RightContainer = styled.div`
//   display: grid;
//   width: 100%;
//   grid-row-gap: 10px;
//   grid-template-rows: 30px 30px auto;
// `;
// const WriteSection = styled(Button)`
//   width: 100%;
// `;
// const SortSection = styled.div`
//   height: 30px;
//   text-align: right;
// `;
// const CardSection = styled.div`
//   height: auto;
//   width: 100%;

//   overflow: auto;
// `;
// const SortButton = styled(Button)`
//   margin-right: 5px;
// `;
// const GoUpButton = styled.button`
//   width: 45px;
//   height: 45px;
//   border-radius: 50% 50%;
//   position: fixed;
//   border: 1px solid black;
//   cursor: pointer;
//   background-color: #dddddd;
//   &:hover {
//     background-color: #ffffff;
//   }
//   @media all and (max-width: 700px) {
//     display: none;
//   }
//   /* PC (해상도 1024px)*/
//   @media all and (min-width: 1024px) {
//     top: 600px;
//     left: 1420px;
//   }
//   /* PC (해상도 1024px)*/
//   @media all and (min-width: 1600px) {
//     top: 800px;
//     left: 1700px;
//     width: 50px;
//     height: 50px;
//   }
// `;
// export default MainPage;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsCardContainer from "../components/NewCardContainer";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Form from "../components/Form";
import Button from "../components/Button";

function MainPage() {
  const state = useSelector((state) => state.auth);
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [category, setCategory] = useState("전체");
  const categories = ["전체", "페스티벌", "연극", "뮤지컬", "전시", "공연", "콘서트"];

  // 로그인 모달 열기
  const openLoginModal = () => {
    if (!state.user) {
      setLoginModal(true);
    }
  };

  // 글쓰기 모달 열기
  const openFormModal = () => {
    if (!state.user) {
      setLoginModal(true);
    } else {
      setFormModal(true);
    }
  };

  const sortByView = () => {};
  const sortByLike = () => {};
  const sortByComment = () => {};

  return (
    <MainPageWrapper>
      <SignUp signUpModal={signUpModal} setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <Login setSignUpModal={setSignUpModal} loginModal={loginModal} setLoginModal={setLoginModal} />
      <LeftContainer>
        <MenuBar>
          {categories.map((category) => {
            return (
              <p key={category} onClick={() => setCategory(category)}>
                {category}
              </p>
            );
          })}
        </MenuBar>
      </LeftContainer>
      <RightContainer>
        <WriteSection onClick={openFormModal}>글쓰기✏️</WriteSection>
        <Form formModal={formModal} setFormModal={setFormModal} />
        <SortSection>
          <SortButton>조회수순</SortButton>
          <SortButton>좋아요순</SortButton>
          <SortButton>댓글순</SortButton>
        </SortSection>
        <CardSection>
          <NewsCardContainer category={category} />
        </CardSection>
      </RightContainer>
    </MainPageWrapper>
  );
}

const MainPageWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px minmax(400px, 1250px) 50px;
`;
const LeftContainer = styled.div`
  -webkit-box-align: center;
  align-items: center;
  text-align: center;
`;
const MenuBar = styled.div`
  width: 80px;
  height: 500px;
  top: 200px;
  border: 1px solid black;
  position: fixed;
  /* margin: 20px; */
`;
const RightContainer = styled.div`
  display: grid;
  width: 100%;
  grid-row-gap: 10px;
  grid-template-rows: 30px 30px auto;
`;
const WriteSection = styled(Button)`
  width: 100%;
`;
const SortSection = styled.div`
  height: 30px;
  text-align: right;
`;
const CardSection = styled.div`
  height: auto;
  width: 100%;
`;
const SortButton = styled(Button)`
  margin-right: 5px;
`;
const GoUpButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50% 50%;
  position: fixed;
  border: 1px solid black;
  cursor: pointer;
  background-color: #dddddd;
  &:hover {
    background-color: #ffffff;
  }
  @media all and (max-width: 700px) {
    display: none;
  }
  /* PC (해상도 1024px)*/
  @media all and (min-width: 1024px) {
    top: 600px;
    left: 1420px;
  }
  /* PC (해상도 1024px)*/
  @media all and (min-width: 1600px) {
    top: 800px;
    left: 1700px;
    width: 50px;
    height: 50px;
  }
`;
export default MainPage;
