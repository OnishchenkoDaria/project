import React from "react";
import PathConstants from "./pathConstants";

const Home = React.lazy(()=> import("../pages/Home"))
const Register = React.lazy(()=> import("../pages/Registration"))
const Account = React.lazy(() => import("../pages/Account"))
const Login = React.lazy(() => import("../pages/Login"))
const Payment = React.lazy(() => import("../pages/Purchase"))
const Blog = React.lazy(()=> import("../pages/Blog"))

const routes = [
    //.lazy = splitting React build in smaler parts, load required chuncks only
    {path: PathConstants.HOME , element: <Home />},
    {path: PathConstants.REGISTRATION , element: <Register />},
    {path: PathConstants.ACCOUNT, element: <Account />},
    {path: PathConstants.LOGIN, element: <Login />},
    {path: PathConstants.PAYMENT, element: <Payment />},
    {path: PathConstants.BLOG, element: <Blog />}
]

export default routes