import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Login from "./pages/user/login.jsx";
import Client from "./pages/client/Index.jsx";
import Paiement from "./pages/transaction/Index.jsx"
import MainLayout from "./layouts/mainLayout.jsx";
import Register from "./pages/user/register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/dashboard",
    element: <MainLayout/>,
    children: [
      {
        path: "/dashboard/client",
        element: <Client/>
      },
      {
        path: "/dashboard/paiement",
        element: <Paiement/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
