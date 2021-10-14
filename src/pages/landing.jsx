import React, { useEffect } from "react";
import { useAuth } from "../apiCalls/useAuth";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div>
      <h1>This is Landing page</h1>
      <Link to="/protected-route">ProtectedRoute</Link>
    </div>
  );
};

export default Landing;
