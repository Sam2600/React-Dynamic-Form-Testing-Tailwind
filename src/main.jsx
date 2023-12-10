/* eslint-disable no-unused-vars */

import './index.css'
import React from 'react';
import { Login } from './pages/Login';
import ReactDOM from 'react-dom/client'
import { Register } from './pages/Register';
import { StudentList } from './pages/StudentList'
import { ThemeProvider } from "@material-tailwind/react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TestingForm } from './pages/testings/TestingForm';
import { TestingQuery } from './pages/testings/TestingQuery';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultLayout } from './layouts/DefaultLayout';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<DefaultLayout />}>

            <Route index element={<StudentList />} />

            {/** Testings */}
            <Route path='/testingForm' element={<TestingForm />} />
            <Route path='/testingQuery' element={<TestingQuery />} />
            {/** Testings */}

          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
  // </React.StrictMode>
);
