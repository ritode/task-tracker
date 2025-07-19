// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import KanbanBoard from "./components/KanbanBoard";
import AdminPage from "./components/AdminPage";
import Meetings from "./components/Meetings";
import Login from "./components/Login";
import { Layout, Menu, Avatar, Dropdown } from "antd";

const { Header, Content } = Layout;

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const avatarMenu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  // A helper hook to know current location for highlighting the menu
  const useCurrentKey = () => {
    const location = useLocation();
    if (location.pathname.includes("meetings")) return "2";
    return "1"; // Default to Task Board
  };

  const AppLayout = () => {
    const currentKey = useCurrentKey();
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ display: "flex" }}>
          <Menu theme="dark" mode="horizontal" style={{ flex: 1 }} selectedKeys={[currentKey]}>
            <Menu.Item key="1">
              <Link to="/home">Task Board</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/home/meetings">Meetings</Link>
            </Menu.Item>
          </Menu>

          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item key="3">
              <Link to="/home/admin">Admin</Link>
            </Menu.Item>
            <Menu.Item key="4" style={{ padding: "0 16px" }}>
              <Dropdown overlay={avatarMenu} placement="bottomRight">
                <Avatar style={{ backgroundColor: "#87d068" }}>
                  {String(loggedInUser.name[0]).toUpperCase()}
                </Avatar>
              </Dropdown>
            </Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: "20px" }}>
          <Switch>
            <Route exact path="/home" component={KanbanBoard} />
            <Route
              path="/home/admin"
              render={(props) => <AdminPage {...props} loggedInUser={loggedInUser} />}
            />
            <Route path="/home/meetings" component={Meetings} />
            <Redirect to="/home" />
          </Switch>
        </Content>
      </Layout>
    );
  };

  return (
    <AppProvider>
      <Router>
        {loggedInUser ? (
          <AppLayout />
        ) : (
          <Switch>
            <Route exact path="/">
              <Login setLoggedInUser={setLoggedInUser} />
            </Route>
            <Redirect to="/" />
          </Switch>
        )}
      </Router>
    </AppProvider>
  );
};

export default App;
