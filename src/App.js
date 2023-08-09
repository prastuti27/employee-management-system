import { Space } from "antd";
import "./App.css";
import Sidemenu from "./Components/Sidemenu";
import Header from "./Components/Header";
import Pagecontent from "./Components/Pagecontent";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Space className="SideMenuAndPageContent">
          <Sidemenu />
          <Pagecontent />
        </Space>
      </div>
    </>
  );
}

export default App;
