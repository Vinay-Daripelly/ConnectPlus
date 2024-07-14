import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import RootLayout from '../RootLayout/RootLayout';
import Home from '../HomeAndDashboard/Home';
import Register from '../signin/Register';
import Login from '../signin/Login';
import Dashboard from '../HomeAndDashboard/Dashboard';
import AlumniProfile from '../alumni-profile/AlumniProfile';
import ProfileView from '../profile-view/ProfileView';
function MainRoute() {
    let router=createBrowserRouter([
        {
            path:'',

            element:<RootLayout/>,
            errorElement:<div className="heading  mx-auto display-6 justify-content-center "> Page Not Found</div>,
            children:[
                {
                    path:'',
                    element:<Home/>

                },
                {
                    path:'signup',
                    element:<Register/>

                },
                {
                    path:'Login',
                    element:<Login/>

                },
                {
                    path:'dashboard',
                    element:<Dashboard/>

                },
                {
                    path:'alumini-profile',
                    element:<AlumniProfile/>
                },
                {
                    path:'profile',
                    element:<ProfileView/>
                }
                
            ]
        }
    ]);
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
    
  )
}

export default MainRoute