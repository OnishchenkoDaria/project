import React from 'react';
import RegistrationForm from '../components/RegisterForm';
import axios from 'axios';
import PathConstants from '../routes/pathConstants';
import { useNavigate } from 'react-router-dom'

const Registration = () => {
  const navigate = useNavigate();
  axios.post('http://localhost:3001/users/session-hook')
  .then(()=>navigate(PathConstants.ACCOUNT))
  .catch((err)=>console.log('session exist'))
  return (
    <>
      <RegistrationForm/>
    </>
  );
}

export default Registration;