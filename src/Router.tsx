import { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";

import AccountDelete from "./pages/AccountDelete.page";
import AddInfo from "./pages/AddInfo.page";
import AddPlace from "./pages/AddPlace.page";
import EditProfile from "./pages/EditProfile.page";
import GuidebookDetail from "./pages/GuidebookDetail.page";
import GuidebookList from "./pages/GuidebookList.page";
import GuidebookWrite from "./pages/GuidebookWrite.page";
import Home from "./pages/Home.page"
import Login from "./pages/Login.page";
import MatchingStatus from "./pages/MatchingStatus.page";
import NotFound from "./pages/NotFound.page";
import PhotographerDetail from "./pages/PhotographerDetail.page";
import PhotographerList from "./pages/PhotographerList.page";
import PhotographerLogin from "./pages/PhotographerLogin.page";
import PhotographerReviewWrite from "./pages/PhotographerReviewWrite.page";
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
        path: '/accountdelete',
        element: <AccountDelete/>,
        errorElement: <NotFound/>
    },  
    {
        path: '/editprofile',
        element: <EditProfile/>,
        errorElement: <NotFound/>
    },  
    {
        path: '/guidebookdetail',
        element: <GuidebookDetail/>,
        errorElement: <NotFound/>
    },   
    {
        path: '/guidebooklist',
        element: <GuidebookList/>,
        errorElement: <NotFound/>,
    },
    {
        path: '/guidebookwrite',
        element: <GuidebookWrite/>,
        errorElement: <NotFound/>
    },
    {
        path: '/matchingstatus',
        element: <MatchingStatus userRole={"photographer"} accountId={""}/>,
        errorElement: <NotFound/>
    },
    {
        path: '/photographerdetail',
        element: <PhotographerDetail/>,
        errorElement: <NotFound/>
    },    
    {
        path: '/photographerlist',
        element: <PhotographerList/>,
        errorElement: <NotFound/>,
    },
    {
        path: '/photographerreviewwrite',
        element: <PhotographerReviewWrite/>,
        errorElement: <NotFound/>
    },
    {
        path: '/',
        element: <Home/>,
        errorElement: <NotFound/>
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
    }  
];

const Router = createBrowserRouter(routes);

export default Router;