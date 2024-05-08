import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Login from "./pages/user/login.jsx";
import Client from "./pages/client/Index.jsx";
import MainLayout from "./layouts/mainLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/dashboard",
    element: <MainLayout/>,
    children: [
      {
        path: "/dashboard/client",
        element: <Client/>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
