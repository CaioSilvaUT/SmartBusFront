import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import CriarCarteirinha from './pages/CriarCarteirinha';
import VerCarteirinha from './pages/VerCarteirinha';
import Creditos from './pages/Creditos';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/cadastro', element: <Cadastro /> },
      { path: '/criarcarteirinha', element: <CriarCarteirinha /> },
      { path: '/vercarteirinha', element: <VerCarteirinha /> },
      { path: '/creditos', element: <Creditos /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
