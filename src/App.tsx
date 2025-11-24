import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as pages from "./pages";
import * as layouts from "./components/layouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/" element={<layouts.PublicLayout />}>
          <Route index element={<pages.LandingPage />} />
          {/* auth */}
          <Route path="auth">
            <Route path="login" element={<pages.LoginPage />} />
            <Route path="register" element={<pages.RegisterPage />} />
          </Route>
        </Route>
        {/* app */}
        <Route path="/app" element={<layouts.AppLayout />}>
          <Route index element={<pages.MainPage />} />
          {/* class */}
          <Route path="class">
            <Route path="create" element={<pages.CreateClassPage />} />
            <Route path="detail" element={<pages.ClassDetailPage />} />
            <Route path="list" element={<pages.ClassListPage />} />
            <Route path="manage" element={<pages.ManageClassPage />} />
            <Route path="rate" element={<pages.RatePage />} />
            <Route path="schedule" element={<pages.SchedulePage />} />
            <Route path="assignment" element={<pages.SubmitAssignmentPage />} />
          </Route>
          {/* knowledge */}
          <Route path="know">
            <Route path="create" element={<pages.CreateKnowledgePage />} />
            <Route path="detail" element={<pages.KnowledgeDetailPage />} />
            <Route path="list" element={<pages.KnowledgeListPage />} />
            <Route path="modify" element={<pages.ModifyKnowledgePage />} />
            <Route path="search" element={<pages.SearchKnowledgePage />} />
          </Route>
          {/* mentoring */}
          <Route path="mento">
            <Route path="create" element={<pages.CreateRecruitmentPage />} />
            <Route path="modify" element={<pages.ModifyRecruitmentPage />} />
            <Route path="detail" element={<pages.RecruitmentDetailPage />} />
            <Route path="list" element={<pages.RecruitmentListPage />} />
            <Route path="search" element={<pages.SearchRecruitmentPage />} />
          </Route>
          {/* qna */}
          <Route path="qna">
            <Route path="create" element={<pages.CreateQnaPage />} />
            <Route path="modify" element={<pages.ModifyQnaPage />} />
            <Route path="detail" element={<pages.QnaDetailPage />} />
            <Route path="list" element={<pages.QnaListPage />} />
            <Route path="search" element={<pages.SearchQnaPage />} />
          </Route>
          {/* user */}
          <Route path="user">
            <Route path="my" element={<pages.MyPage />} />
            <Route path="profile" element={<pages.EditProfilePage />} />
            <Route path="posts" element={<pages.PostListPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
