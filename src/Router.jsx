import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import JobSitesList from './pages/JobSitesList.jsx'
import JobSiteProvider from "./components/context/JobSiteContext.jsx";
import NotFoundPage from "./pages/NotFound.jsx";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <JobSitesList />
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