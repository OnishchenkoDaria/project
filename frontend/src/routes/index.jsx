import React from "react";
import PathConstants from "./pathConstants";

const Home = React.lazy(()=> import("../pages/Home"))
const Register = React.lazy(()=> import("../pages/Registration"))

const routes = [
    //.lazy = splitting React build in smaler parts, load required chuncks only
    {path: PathConstants.HOME , element: <Home />},
    {path: PathConstants.REGISTRATION , element: <Register />}
]

export default routes