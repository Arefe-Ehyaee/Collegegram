import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Login from "./components/signup-login/Login";
import SignUp from "./components/signup-login/Signup";
import RetrievePassword from "./components/signup-login/RetrievePassword";
import SetNewPassword from "./components/signup-login/SetNewPassword";
import ErrorLayout from "./components/Error";
import CheckYourEmail from "./components/signup-login/CheckYourEmail";
import ProfilePage from "./components/profile-page/ProfilePage";
import PostsPage from "./components/Posts/PostsPage";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/retrievePass" element={<RetrievePassword />} />
          <Route path="/setNewPassword" element={<SetNewPassword />} />
          <Route path="/error" element={<ErrorLayout />} />
          <Route path="/checkYourEmail" element={<CheckYourEmail />} />
          <Route path="/userprofile" element={<ProfilePage />} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
