import React from "react";
import { Space } from "antd";
import { MailOutlined, BellFilled } from "@ant-design/icons";
import logo from "../images/logo.png";
import BackButton from "./BackButton";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  return (
    <div className="AppHeader">
      <div className="logo">
        <img src={logo} alt="" />
        <div>{!isDashboard && <BackButton />}</div>
      </div>

      <h1>Employee Management System</h1>
      <Space>
        <MailOutlined style={{ fontSize: 24 }} />
        <BellFilled style={{ fontSize: 24 }} />
      </Space>
    </div>
  );
};

export default Header;
