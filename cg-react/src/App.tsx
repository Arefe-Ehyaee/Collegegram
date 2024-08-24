import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Login from "./components/signup-login/Login";
import SignUp from "./components/signup-login/Signup";
import RetrievePassword from "./components/signup-login/RetrievePassword";
import SetNewPassword from "./components/signup-login/SetNewPassword";
import ErrorLayout from "./components/Error";
import CheckYourEmail from "./components/signup-login/CheckYourEmail";
import ProfilePage from "./components/profile-page/ProfilePage";
import PostsPage from "./components/Posts/PostsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UsersProfilePage from "./components/Users/UsersProfilePage";
import PrivateRoute from "./components/signup-login/PrivateRoute";
import  TestPage  from "./components/TestPage";
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'

const queryClient = new QueryClient() ;

export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/testPage" element={<TestPage/>} />
            <Route
              path="/retrievePass"
              element={
                  <RetrievePassword />
              }
            />
            <Route
              path="/reset-password"
              element={
                  <SetNewPassword />
              }
            />
            <Route
              path="/error"
              element={
                  <ErrorLayout />
              }
            />
            <Route
              path="/checkYourEmail"
              element={
                  <CheckYourEmail />
              }
            />
            <Route
              path="/userprofile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/posts"
              element={
                <PrivateRoute>
                  <PostsPage />
                </PrivateRoute>
              }
            />
            <Route path="/users" element={<UsersProfilePage />} />
          </Routes>

          <ToastContainer bodyClassName="toastBody" />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}
