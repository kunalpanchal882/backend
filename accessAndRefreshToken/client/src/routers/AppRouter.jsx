import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Register from '../components/Register'
import Profile from '../components/Profile'

const AppRouter = () => {


    const router = createBrowserRouter([
        {
            path:"/",
            element:<Register/>
        },
        {
            path:"/profile",
            element:<Profile/>
        }
    ])

  return <RouterProvider router={router}/>
}

export default AppRouter