import { createBrowserRouter } from "react-router-dom";
import Login from "./Views/Login.jsx";
import SignUp from "./Views/SignUp.jsx";
import Users from "./Views/Users.jsx";
import NotFound from "./Views/NotFound.jsx";
import Dashboard from "./Views/Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import { Navigate } from "react-router-dom";
import UserForm from "./Views/UserForm.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />
            },
            {
                path: "/users",
                element: <Users />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/users/new",
                element: <UserForm key='userCreate'/>
            },
            {
                path: "/users/:id",
                element: <UserForm key='userUpdate'/>
            },
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
        path: "/login",
        element: <Login />
            },
            {
        path: "/signup",
        element: <SignUp />
            },
        ]    
    },
    
    {
        path: "*",
        element: <NotFound />
    }
]);

export default router;