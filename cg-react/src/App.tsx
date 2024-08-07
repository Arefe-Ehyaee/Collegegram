import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import RetrievePassword from './components/RetrievePassword';
import SetNewPassword from './components/SetNewPassword';
import ErrorLayout from './components/Error';
import CheckYourEmail from './components/CheckYourEmail';

export default function App() {
  return (
    <div className='App'>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/retrievePass" element={<RetrievePassword />} />
              <Route path="/setNewPassword" element={<SetNewPassword />} />
              <Route path="/error" element={<ErrorLayout />} />
              <Route path="/checkYourEmail" element={<CheckYourEmail />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}
