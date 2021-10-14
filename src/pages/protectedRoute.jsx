import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../apiCalls/useAuth";
const Protectedroute = () => {
  const { isLoggedIn, logout } = useAuth();
  const history = useHistory();
  return (
    <div>
      <h1>This is protected route</h1>
      {isLoggedIn && (
        <button
          onClick={() => logout({ callBack: () => history.push("/login") })}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Protectedroute;
