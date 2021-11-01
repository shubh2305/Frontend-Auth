import "./App.css";
import { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Error from "./pages/error";
import routes from "./routes/routes";
import Privateroute from "./routes/PrivateRoute";
import Publicroute from "./routes/PublicRoute";
import { AuthProvider, useAuth } from "./apiCalls/useAuth";
import Landing from "./pages/landing";

function App() {
  const location = useLocation();
  const { getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, [location]);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
