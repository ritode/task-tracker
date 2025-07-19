// src/components/Login.jsx
import React, { useState } from "react";
import { Button, Input } from "antd";
import { useHistory } from "react-router-dom";

const Login = ({ setLoggedInUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // no validation required
  const history = useHistory();

  const handleLogin = () => {
    if (!email) return;
    const name = email.split("@")[0] || "User";
    setLoggedInUser({ name });
    history.push("/home");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px", gap: "10px" }}>
      <Input
        style={{ width: 250 }}
        placeholder="Email ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input.Password
        style={{ width: 250 }}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default Login;
