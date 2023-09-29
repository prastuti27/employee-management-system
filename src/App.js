import { Space } from "antd";
import "./App.css";
import Sidemenu from "./Components/Sidemenu";
import Header from "./Components/Header";
import Pagecontent from "./Components/Pagecontent";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="App">
        <Header />
        <Space className="SideMenuAndPageContent">
          {location.pathname !== "/login" && <Sidemenu />}
          <Pagecontent />
        </Space>
      </div>
    </>
  );
}

export default App;
