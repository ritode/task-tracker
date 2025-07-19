// src/components/Login.jsx
import React from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

const Login = ({ setLoggedInUser }) => {
  const history = useHistory();

  const handleLogin = () => {
    // Simulate login with Alice
    setLoggedInUser({ name: "Alice" });
    history.push("/home");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <Button type="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default Login;
