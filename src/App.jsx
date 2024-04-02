import React from 'react';
import AuthProvider from './provider/AuthProvider';
import Routes from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
      <ToastContainer autoClose={2000} />
    </AuthProvider>
  );
};