import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import CustomButtonH36 from './components/ButtonComponentH36';
// import CustomButtonH52 from './components/ButtonComponentH52';
import reportWebVitals from './reportWebVitals';
import MainLayout from './mainLayout';
// import addposticon from './assets/icons/addposticon.svg'
// import rclogo from './assets/icons/rclogo.svg'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainLayout></MainLayout>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
