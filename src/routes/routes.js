import Landing from "../pages/landing";
import Login from "../pages/login";
import Protectedroute from "../pages/protectedRoute";
import Register from "../pages/register";


const routes = [
  {
    path: '/login',
    component: Login,
    private: false,
  },
  {
    path: '/register',
    component: Register,
    private: false,
  },
  {
    path: '/protected-route',
    component: Protectedroute,
    private: true
  }
]

export default routes;