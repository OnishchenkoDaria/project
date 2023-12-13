import React, { useState } from 'react';
import SessionButtons from '../components/SessionCheck';
import PaymentTable from '../components/PaymentTable';
import axios from 'axios';
import PathConstants from '../routes/pathConstants';
import { useNavigate } from 'react-router-dom'

const Account = () => {

  const [hello, setHello] = useState()
  
  const navigate = useNavigate();
  axios.post('http://localhost:3001/users/session-hook')
  .then((par)=>{
    const message = 'welcome, '+ par.data; 
    console.log('welcome', par); 
    setHello(message)})
  .catch(() => {
    navigate(PathConstants.LOGIN)
  })
  return(
    <>
      <h1 style={{textAlign: 'center'}}>{hello}</h1>
      <SessionButtons />
      <PaymentTable />
    </>
  );
}

export default Account;