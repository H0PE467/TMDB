import { Home, Popular, Show } from "../pages"
import { RouteObject, createBrowserRouter } from "react-router-dom";

import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { ROUTES } from "./constants";
import {TopRated} from "../pages/TopRated";
import { NowPlaying } from "../pages/NowPlaying";
import {Favorites} from "../pages/Favorites";


const routes: RouteObject[] =[
    {
        path: ROUTES.HOME, element: <PrivateRouter/>,
        children: [
            { path: ROUTES.HOME, element: <Home/>},
            { path: ROUTES.POPULAR, element: <Popular/>},
            { path: ROUTES.TOPRATED, element: <TopRated/>},
            { path: ROUTES.NOWPLAYING, element: <NowPlaying/>},
            { path: ROUTES.FAVORITES, element: <Favorites/>},
            { path: `${ROUTES.SHOW}:id`, element: <Show/>},
        ]
    },
    {
        path: '/', element: <PublicRouter />,
        children: [
            { path: '/', element: <Home/>}
        ]
    }
]

export const router = createBrowserRouter(routes);