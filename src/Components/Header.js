import React, { useEffect, useState } from "react";
import { Space } from "antd";

import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

import BackButton from "./BackButton";
import { useLocation } from "react-router-dom";

import { auth } from "../firebase";

import { signOut } from "firebase/auth";
import jwt_decode from "jwt-decode";

const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const isLogin = location.pathname === "/login";

  const navigate = useNavigate();
  //  const [userAccessToken, setUserAccessToken] = useState(null);

  const handleLogout = () => {
    const token = localStorage.getItem("accessToken");
    const user = jwt_decode(token);
    console.log("logged in user", user);
    localStorage.removeItem("accessToken");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // useEffect(() => {
  //   setUserAccessToken(localStorage.getItem("accessToken"));
  // }, []);

  return (
    <div className="AppHeader">
      <div className="logo">
        <img src={logo} alt="" />
        <div>{!isDashboard && !isLogin && <BackButton />}</div>
      </div>

      <h1>Employee Management System</h1>
      <Space>
        {/* <MailOutlined style={{ fontSize: 24 }} />
        <BellFilled style={{ fontSize: 24 }} /> */}
        {localStorage.getItem("accessToken") !== null && !isLogin && (
          <button
            id="loginButton"
            onClick={() => handleLogout()}
            variant="primary"
          >
            Logout
          </button>
        )}
      </Space>
    </div>
  );
};

export default Header;
