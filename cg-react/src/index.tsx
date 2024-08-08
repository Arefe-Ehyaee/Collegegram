import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import successSvg from "./assets/icons/check-circle.svg"
import Banner from './components/BannerComponent';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <MainLayout></MainLayout> */}
    <App></App>
    {/* <Banner text={'با موفقیت وارد شدید'} iconsrc={successSvg} styling={"bg-sabz-300"}></Banner> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
