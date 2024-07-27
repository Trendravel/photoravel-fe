import { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home.page"
import Login from "./pages/Login.page";
import NotFound from "./pages/NotFound.page";


interface RouteElement {
    path: string;
    element: ReactNode;
    errorElement: ReactNode;
}

const routes: RouteElement[] = [
    {
        path: '/',
        element: <Home/>,
        errorElement: <NotFound/>,
    },
    {
        path: '/login',
        element: <Login/>,
        errorElement: <NotFound/>
    },
];

const Router = createBrowserRouter(routes);

export default Router;