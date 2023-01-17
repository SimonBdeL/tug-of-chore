import React, { useContext, useState } from "react";
const API_BASE = "http://localhost:3001";

export default function LoginPage({ enter, setEnter }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [token, setToken] = useContext();

  const loginRequest = async (password) => {
    await fetch(API_BASE + "/tugofchore/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Login failed");
      }
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginRequest(password)
      .then(() => {
        setEnter(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <div style={{ color: "red" }}>{error}</div>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
