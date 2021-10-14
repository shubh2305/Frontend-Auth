import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../apiCalls/useAuth";
const Login = () => {
  const { user, isLoggedIn, login } = useAuth();
  const history = useHistory();
  const location = useLocation();
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
      <button
        onClick={() =>
          login({
            username: "a",
            email: "a@a.com",
            callBack: () =>
              history.push(
                !!location.state && !!location.state.from
                  ? location.state.from
                  : "/"
              ),
          })
        }
      >
        Login
      </button>
    </div>
  );
};

export default Login;
