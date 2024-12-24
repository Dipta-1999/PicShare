import { createBrowserRouter } from "react-router-dom";
import Navbar3 from "../components/navbar-initial";
import NavbarLogin from "../components/navbar-login";
import InitialPage from "../page/initial";
import HomePage from "../page/home";
import LoginPage from "../page/login";
const router = createBrowserRouter([

    { path: "/", element: <InitialPage/> } ,
    { path: "/login", element: <LoginPage/> } ,
    { path: "/home", element: <HomePage/>  }

]);
export default router;