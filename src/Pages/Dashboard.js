import { Card, Space } from "antd";
import Statistic from "antd/es/statistic/Statistic";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";

function Dashboard() {
  return (
    <div className="dash-card">
      <h3>Dashboard</h3>
      <Space direction="horizontal">
        <DashboardCard
          icon={<TeamOutlined style={{ marginLeft: "150px" }} />}
          title={"Teams"}
          value={23}
          style={{ backgroundColor: "blue" }}
        />
        <DashboardCard
          icon={<UserOutlined style={{ marginLeft: "120px" }} />}
          title={"Employees"}
          value={105}
          style={{ backgroundColor: "orange" }}
        />
      </Space>
    </div>
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
