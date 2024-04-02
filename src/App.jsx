import React, { useEffect } from 'react';
import AuthProvider from './provider/AuthProvider';
import Routes from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <AuthProvider>
      <Routes />
      <ToastContainer autoClose={2000} />
    </AuthProvider>
  );
};