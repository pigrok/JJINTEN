import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import MyPage from "../pages/MyPage";
import Detail from "../pages/Detail";
import Header from "../components/Header";

const Router = () => {
  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="mypage/:id" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
