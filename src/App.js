import "./App.css";
import { Route, Switch } from "react-router-dom";
import Error from "./pages/error";
import routes from "./routes/routes";
import Privateroute from "./routes/PrivateRoute";
import Publicroute from "./routes/PublicRoute";
import { AuthProvider } from "./apiCalls/useAuth";
import Landing from "./pages/landing";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        {routes.map((route) => {
          if (route.private) {
            console.log("private");
            return (
              <Privateroute path={route.path} component={route.component} />
            );
          } else {
            console.log("public");
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
