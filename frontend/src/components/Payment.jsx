import "../styles/Header.css"
import React, { useEffect, useState } from 'react';
import userService from '../services/registerForm'
import Form from 'react-bootstrap/Form'

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
      <Form>
        <h1 className="mt-5">Please select she photoshoot duration</h1>
        <div key={`default-radio`} className="mb-3">
          <Form.Check 
          type="radio"
          id="photoshoot-1"
          label="1 hour --- 1UAH"          
          name="photoshoot"
          value="1" 
          onChange={getPressed}
          className="mt-3"
          />
          <Form.Check 
          type="radio"
          id="photoshoot-2"
          label="2 hours --- 2UAH"          
          name="photoshoot"
          value="2" 
          onChange={getPressed}
          className="mt-3"
          />
          <Form.Check 
          type="radio"
          id="photoshoot-3"
          label="2+ hours --- 3UAH"          
          name="photoshoot"
          value="3" 
          onChange={getPressed}
          className="mt-3"
          />
        </div>  
      </Form>

      {buttonPressed && <form method="POST" action="https://www.liqpay.ua/api/3/checkout" acceptCharset="utf-8">
      <input type="hidden" name="data" value={formData.data}/>
      <input type="hidden" name="signature" value={formData.signature}/>
      <input type="image" src="//static.liqpay.ua/buttons/p1ru.radius.png"/>
      </form>}
      
    </>
  );
};

export default Payment;

