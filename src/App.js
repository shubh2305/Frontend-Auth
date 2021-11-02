import "./App.css";
import { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { PuffLoader } from "react-spinners";

import Error from "./pages/error";
import routes from "./routes/routes";
import Privateroute from "./routes/PrivateRoute";
import Publicroute from "./routes/PublicRoute";
import { AuthProvider, useAuth } from "./apiCalls/useAuth";
import Landing from "./pages/landing";

function App() {
  const location = useLocation();
  const { getUser, loading } = useAuth();

  useEffect(() => {
    getUser();
  }, [location]);

  return (
    <div className="App">
      {loading ? (
        <div className="loader">
          <PuffLoader size={60} loading={loading} />
          <h1>Loading...</h1>
        </div>
      ) : (
        <Switch>
          <Route exact path="/" component={Landing} />
          {routes.map((route) => {
            if (route.private) {
              return (
                <Privateroute path={route.path} component={route.component} />
              );
            } else {
              return (
                <Publicroute path={route.path} component={route.component} />
              );
            }
          })}
          <Route component={Error} />
        </Switch>
      )}
    </div>
  );
}

export default App;
