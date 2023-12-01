import React from 'react';
import "../styles/Form.css"
import PaymentForm from '../components/PaymentForm';

const Purchase = () => {
  
  return (

    <div className="text">
      <p>Photoshoot 1</p>
      <p>Photoshoot 2</p>
      <p>Photoshoot 3</p>
      <PaymentForm></PaymentForm>
    </div>
  );
}

export default Purchase;