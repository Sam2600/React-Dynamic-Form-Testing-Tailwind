/* eslint-disable no-unused-vars */
import ReactDOM from 'react-dom/client'
import './index.css'
import { StudentList } from './pages/StudentList'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Register } from './pages/Register';
import { Login } from './pages/Login';

import { ThemeProvider } from "@material-tailwind/react";
import { TestingForm } from './pages/TestingForm';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StudentList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/TestingForm' element={<TestingForm />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  // </React.StrictMode>

);
