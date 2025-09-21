import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import JobSitesList from './pages/JobSitesList.jsx'
import {createContext} from "react";
import JobSiteProvider from "./components/context/JobSiteContext.jsx";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <JobSitesList />
        },

        // 404 Not Found page
        // {
        //     path: '*',
        //     element: <NotFound />
        // }
    ])

    return (
        <JobSiteProvider>
            <RouterProvider router={router}/>
        </JobSiteProvider>
    )
}

export default Router