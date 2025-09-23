import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import JobSitesList from './pages/JobSitesList.jsx'
import JobSiteProvider from "./components/context/JobSiteContext.jsx";
import NotFoundPage from "./pages/NotFound.jsx";
import JobSiteInventory from "./pages/JobSiteInventory.jsx";
import Error from "./pages/ErrorElement.jsx";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <JobSitesList />,
            errorElement: <Error />
        },
        {
            path: '/jobsites/:id',
            element: <JobSiteInventory />,
            errorElement: <Error />
        },

        // 404 Not Found page
        {
            path: '*',
            element: <NotFoundPage />
        }
    ])

    return (
        <JobSiteProvider>
            <RouterProvider router={router}/>
        </JobSiteProvider>
    )
}

export default Router