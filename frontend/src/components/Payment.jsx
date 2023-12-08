import "../styles/Header.css"
import React, { useEffect, useState } from 'react';
import userService from '../services/registerForm'

const Payment = () => {
  //state for the price chosen
  const [buttonPressed, setButtonPressed] = useState(false)
  //state for generated in backend key and signature for the liqpay to be passed
  const [formData, setFormData] = useState({
    data: '',
    signature: '',
  });
  
  //parses the price and calls axios request to generate the key & signature
  const  getPressed = (par) =>{
    setButtonPressed(true)
    HashiInfo(par.target.value);
  }

  //calling axios, setting state to be passed to liqpay
  const HashiInfo = async (value) => {
    console.log(value)
    try {
      const Info = await userService.hash(value);
      const data = Info.data;
      const signature = Info.signature;

      setFormData({
        data,
        signature,
      });
      setButtonPressed(true)
    } catch (error) {
      console.error('Error fetching hash info:', error.message);
    }    
  };

  return (
    <>
      <form>
        <p>Please select she photoshoot</p>
        <p>photoshoot-1</p>
        <input type="radio" id="photoshoot-1" name="photoshoot" value="1" onChange={getPressed}/>
        <p >photoshoot-3</p>
        <input type="radio" id="photoshoot-2" name="photoshoot" value="2" onChange={getPressed}/>
        <p >photoshoot-3</p>
        <input type="radio" id="photoshoot-3" name="photoshoot" value="3" onChange={getPressed}/>
        <br/>
      </form>

      {buttonPressed && <form method="POST" action="https://www.liqpay.ua/api/3/checkout" acceptCharset="utf-8">
      <input type="hidden" name="data" value={formData.data}/>
      <input type="hidden" name="signature" value={formData.signature}/>
      <input type="image" src="//static.liqpay.ua/buttons/p1ru.radius.png"/>
      </form>}
      
    </>
  );
};

export default Payment;

