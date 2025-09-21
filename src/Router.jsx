import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import JobSitesList from './pages/JobSitesList.jsx'

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

    return <RouterProvider router={router}/>
}

export default Router