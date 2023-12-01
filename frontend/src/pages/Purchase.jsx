import React from 'react';
import "../styles/Form.css"
import PaymentForm from '../components/PaymentForm';
import Payment from '../components/Payment';

const Purchase = () => {
  
  return (

    <div className="text">
      <p>Photoshoot 1</p>
      <p>Photoshoot 2</p>
      <p>Photoshoot 3</p>
      <Payment />
    </div>
  );
}

export default Purchase;