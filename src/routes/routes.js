import Landing from "../pages/landing";
import Login from "../pages/login";
import Protectedroute from "../pages/protectedRoute";
import Register from "../pages/register";
import ProtectedRoute2 from "../pages/protected-route-2";


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
  },
  {
    path: '/protected-route-2',
    component: ProtectedRoute2,
    private: true
  }
]

export default routes;