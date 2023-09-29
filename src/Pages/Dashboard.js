import { Card, Space } from "antd";
import Statistic from "antd/es/statistic/Statistic";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Employee from "./Employee";
import { getTeams } from "../redux/TeamReducer";
import { getEmployees } from "../redux/UserReducer";

function Dashboard() {
  const token = localStorage.getItem("accessToken");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getTeams());
  }, [dispatch]);

  const userList = useSelector((state) => state.users);
  const teamList = useSelector((state) => state.teams);

  const users = userList.users;
  const teams = teamList.teams;

  const totaluser = users.length;
  const totalteam = teams.length;
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="dash-card">
        <h3>Dashboard</h3>
        <Space direction="horizontal">
          <Link to={"/team"}>
            <DashboardCard
              icon={<TeamOutlined style={{ marginLeft: "150px" }} />}
              title={"Teams"}
              value={totalteam}
              style={{ backgroundColor: "blue" }}
            />
          </Link>
          <Link to={"/employee"}>
            <DashboardCard
              icon={<UserOutlined style={{ marginLeft: "120px" }} />}
              title={"Employees"}
              value={totaluser}
              style={{ backgroundColor: "orange" }}
            />
          </Link>
        </Space>
      </div>
      <h3 className="mt-5 my-4">Recently Added Employees</h3>
      <Employee showEditButton={false} totalUsersInTable={5}></Employee>
    </>
  );
}
function DashboardCard({ bodyStyle, title, value, icon, style }) {
  return (
    <Card style={style}>
      <Space direction="horizontal">
        <Statistic
          title={
            <span
              style={{ fontSize: "20px", fontWeight: "Bold", color: "white" }}
            >
              {title}
            </span>
          }
          value={value}
          bodyStyle={bodyStyle}
        />

        <div style={{ color: "white" }}>{icon}</div>
      </Space>
    </Card>
  );
}
export default Dashboard;
