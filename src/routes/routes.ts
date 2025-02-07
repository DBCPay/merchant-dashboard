import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Redirect from "../pages/Redirect";
import Logout from "../pages/Logout";
import Register from "../pages/Register";

export interface RouteElement {
  path: string;
  Element: () => JSX.Element;
}

// authentication route
const publicRoutes: RouteElement[] = [
  {
    path: "/login",
    Element: Login,
  },
  { path: "/register", Element: Register },
  {
    path: "/logout",
    Element: Logout,
  },
  {
    path: "/",
    Element: Redirect,
  },
];

// private route
const privateRoutes: RouteElement[] = [
  {
    path: "/dashboard",
    Element: Dashboard,
  },
];

export { publicRoutes, privateRoutes };
