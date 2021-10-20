import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../apiCalls/useAuth";
const Login = () => {
  const { user, isLoggedIn, login } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    login({
      data: {
        email: email,
        password: password,
      },
      callBack: () =>
        history.push(
          !!location.state && !!location.state.from ? location.state.from : "/"
        ),
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.replace({
        pathname:
          !!location.status && !!location.status.from
            ? location.status.from
            : "/feed",
      });
    }
  });

  return (
    <div>
      <h1>This is login page</h1>
      <form onSubmit={loginUser}>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
