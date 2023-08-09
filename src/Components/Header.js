import React from "react";
import { Space } from "antd";
import { MailOutlined, BellFilled } from "@ant-design/icons";
import logo from "../images/logo.png";

const Header = () => {
  return (
    <div className="AppHeader ">
      <div className="logo">
        <img src={logo} alt="" />
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
