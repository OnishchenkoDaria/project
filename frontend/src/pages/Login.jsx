import React from "react";
import LoginForm from "../components/LoginForm";
import axios from 'axios';
import PathConstants from '../routes/pathConstants';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  axios.post('http://localhost:3001/users/session-hook')
  .then(()=>navigate(PathConstants.ACCOUNT))
  .catch((err)=>console.log('session exist'))
  return (
    <div className="d-flex justify-content-center mt-5">
      <LoginForm />
    </div>
  );
};

export default Login;
