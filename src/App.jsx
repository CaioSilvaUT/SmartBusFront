import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import store from './auth/store';
import Home from './pages/Home';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import VerHorarios from './pages/VerHorarios';
import Perfil from './pages/Perfil';
import Cartao from './pages/Cartao';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <Login /> },
      { path: '/cadastro', element: <Cadastro /> },
      {path: '', element: <PrivateRoute />, children: [
      { path: '/home', element: <Home /> },
      { path: '/perfil', element: <Perfil />},
      { path: '/verhorarios', element: <VerHorarios /> },
      { path: '/cartao', element: <Cartao />},
      ]},
    ],
  },
]);

const App = () => {
  return (
    <>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
    </>
    )
};

export default App;
