import { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";

import GuidebookDetail from "./pages/GuidebookDetail.page";
import GuidebookEdit from "./pages/GuidebookEdit.page";
import GuidebookList from "./pages/GuidebookList.page";
import GuidebookWrite from "./pages/GuidebookWrite.page";
import NotFound from "./pages/NotFound.page";
import PhotographerDetail from "./pages/PhotographerDetail.page";
import PhotographerList from "./pages/PhotographerList.page";
import PhotographerReviewWrite from "./pages/PhotographerReviewWrite.page";

interface RouteElement {
    path: string;
    element: ReactNode;
    errorElement: ReactNode;
}

const routes: RouteElement[] = [
    {
        path: '/guidebookdetail',
        element: <GuidebookDetail/>,
        errorElement: <NotFound/>
    }, 
    {
        path: '/guidebookedit',
        element: <GuidebookEdit/>,
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
];

const Router = createBrowserRouter(routes);

export default Router;