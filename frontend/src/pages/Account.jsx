import React from 'react';
import SessionButtons from '../components/SessionCheck';
import PaymentTable from '../components/PaymentTable';
import axios from 'axios';
import PathConstants from '../routes/pathConstants';
import { useNavigate } from 'react-router-dom'

const Account = () => {
  
  const navigate = useNavigate();
  axios.post('http://localhost:3001/users/session-hook')
  .then(()=>console.log('welcome'))
  .catch(() => {
    navigate(PathConstants.LOGIN)
  })
  return (
    <>
      <SessionButtons />
      <PaymentTable />
    </>
  );
}

export default Account;