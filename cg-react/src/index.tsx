import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CustomButtonH36 from './components/ButtonComponentH36';
import CustomButtonH52 from './components/ButtonComponentH52';
import reportWebVitals from './reportWebVitals';
import addposticon from './assets/icons/addposticon.svg'
import InputField from './components/TextInput';
import UserSvg from "./assets/svgs/user.svg"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className='mt-3.5 h-full flex items-center justify-center gap-3 bg-khakeshtari-100'>
    <CustomButtonH36 text='ثبت نام کنید'styling='bg-okhra-300' />
    <CustomButtonH52 text='برای پست جدید اینجا کلیک کنید' styling='bg-okhra-200' iconsrc={addposticon} />
    <InputField type="text" placeholder="نام کاربری یا ایمیل" name="username" iconsrc={UserSvg} />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
