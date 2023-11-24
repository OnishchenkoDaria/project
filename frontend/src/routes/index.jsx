import React from "react";
import PathConstants from "./pathConstants";

const Home = React.lazy(()=> import("../pages/Home"))
const Register = React.lazy(()=> import("../pages/Registration"))
const Account = React.lazy(() => import("../pages/Account"))

const routes = [
    //.lazy = splitting React build in smaler parts, load required chuncks only
    {path: PathConstants.HOME , element: <Home />},
    {path: PathConstants.REGISTRATION , element: <Register />},
    {path: PathConstants.ACCOUNT, element: <Account />}
]

export default routes