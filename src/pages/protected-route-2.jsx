import React from 'react';
import { Link } from 'react-router-dom';
const ProtectedRoute2 = () => {
  return (
    <div>
      <h1>This is Protected route 2</h1>
      <Link to='/protected-route'>Protected Route</Link>
    </div>
  );
}

export default ProtectedRoute2;
