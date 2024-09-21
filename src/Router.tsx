import { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";

import AddInfo from "./pages/AddInfo.page";
import AddPlace from "./pages/AddPlace.page";
import Home from "./pages/Home.page"
import Login from "./pages/Login.page";
import NotFound from "./pages/NotFound.page";
import PhotographerLogin from "./pages/PhotographerLogin.page";
import RedirectPage from "./pages/Redirect.page";
import SignUp from "./pages/SignUp.page";


interface RouteElement {
    path: string;
    element: ReactNode;
    errorElement: ReactNode;
    children?: RouteElement[]
}

const routes: RouteElement[] = [
    {
        path: '/',
        element: <Home/>,
        errorElement: <NotFound/>,
    },
    {
        path: '/place',
        element: <Home/>,
        errorElement: <NotFound/>,
    },
    {
        path: '/search',
        element: <Home/>,
        errorElement: <NotFound/>,
    },
    {
        path: '/login',
        element: <Login/>,
        errorElement: <NotFound/>,
    },
    {
        path: '/oauthlogin/addinfo',
        element: <AddInfo/>,
        errorElement: <NotFound/>
    },
    {
        path: '/photographer/login',
        element: <PhotographerLogin/>,
        errorElement: <NotFound/>
    },
    {
        path: '/signup',
        element: <SignUp/>,
        errorElement: <NotFound/>
    },
    {
        path: '/addplace',
        element: <AddPlace/>,
        errorElement: <NotFound/>
    },
    {
        path: '/redirect',
        element: <RedirectPage/>,
        errorElement: <NotFound/>
    },    
];

const Router = createBrowserRouter(routes);

export default Router;