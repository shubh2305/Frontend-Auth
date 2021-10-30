import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../apiCalls/useAuth";
const Protectedroute = () => {
  const { user, logout } = useAuth();
  const history = useHistory();
  return (
    <div>
      <h1>Welcome {user.email}</h1>

      <Link to="/protected-route-2">Protected Route 2</Link>
      <button
        onClick={() => logout({ callBack: () => history.push("/login") })}
      >
        Logout
      </button>
    </div>
  );
};

export default Protectedroute;
