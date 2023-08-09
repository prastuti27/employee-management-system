import { Menu } from "antd";
import { Space } from "antd";

import {
  AppstoreOutlined,
  TeamOutlined,
  UserOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

function Sidemenu() {
  const navigate = useNavigate();
  return (
    <div className="Sidemenu">
      <Space>
        <Menu
          theme="dark"
          onClick={(item) => {
            //item.key
            navigate(item.key);
          }}
          items={[
            {
              label: "Dashboard",
              icon: <AppstoreOutlined />,
              key: "/",
            },
            {
              label: "Teams",
              icon: <TeamOutlined />,
              key: "/team",
            },
            {
              label: "Employees",
              icon: <UserOutlined />,
              key: "/employee",
            },
            {
              label: "Project",
              icon: <ProjectOutlined />,
              key: "/project",
            },
          ]}
        />
      </Space>
    </div>
  );
}

export default Sidemenu;
