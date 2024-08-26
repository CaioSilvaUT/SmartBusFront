import React from 'react'
import { Route, RouterProvider } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'

const router = createBrowserRouter([
  { path: "/", element: <MainLayout />, children: [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login />},
    { path: "/cadastro", element: <Cadastro />}
  ] }],
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App