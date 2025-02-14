import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Admin from "./routes/Admin";
import Dashboard from "./routes/Dashboard";
import FaQ from "./routes/FaQ";
import LogIn from "./routes/LogIn";
import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
import UploadVideo from "./routes/UploadVideo";
import VideoResult from "./routes/VideoResult";
import LeftContentArea from "./components/Dashboard/LeftContentArea";
import LeftContentAreaDetail from "./components/Dashboard/LeftContentAreaDetail";
import Inquiry from "./routes/Inquiry";
import ResetPassword from "./routes/ResetPassword";
import AdminApproval from "./routes/AdminApproval";
import AdminReply from './routes/AdminReply';
import Profile from './routes/Profile';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          { path: "approval", element: <AdminApproval /> },
          { path: "replyinquiry", element: <AdminReply /> },
          { path: "dashboard",
            element: <Dashboard />,
            children: [
              { path: "", element: <LeftContentArea /> },
              { path: "detail/:id", element: <LeftContentAreaDetail /> }
            ] }
        ]
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { path: "", element: <LeftContentArea /> },
          { path: "detail/:id", element: <LeftContentAreaDetail /> }
        ]
      },
      {
        path: "faq",
        element: <FaQ />,
      },
      {
        path: "login/loginPage",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "uploadVideo",
        element: <UploadVideo />,
      },
      {
        path: "videoresult",
        element: <VideoResult />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "inquiry",
        element: <Inquiry />,
      },
      {
        path: "resetpassword",
        element: <ResetPassword />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);


export default router;