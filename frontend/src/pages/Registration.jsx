import React from "react";
import RegistrationForm from "../components/RegisterForm";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import PathConstants from '../routes/pathConstants';
import { useNavigate } from 'react-router-dom'

const Registration = () => {
  const navigate = useNavigate();
  axios.post('http://localhost:3001/users/session-hook')
  .then(()=>navigate(PathConstants.ACCOUNT))
  .catch((err)=>console.log('session exist'))
  return (
    <div className="d-flex justify-content-center mt-5">
      <RegistrationForm />
    </div>
  );
};

export default Registration;
