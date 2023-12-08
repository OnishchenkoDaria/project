import React from 'react';
import SessionButtons from '../components/SessionCheck';
import { useEffect } from 'react';
import userService from '../services/registerForm' 

const Account = () => {
  
  //userService.paymentResult()
  /*useEffect(async() => {
    const result = await userService.paymentResult()
    try{
      console.log(result)
    }catch(err){

    }
  }, []);*/

  return (
    <>
      <SessionButtons />
    </>
  );
}

export default Account;