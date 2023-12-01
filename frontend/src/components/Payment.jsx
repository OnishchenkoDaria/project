import "../styles/Header.css"
import React, { useEffect, useState } from 'react';
import userService from '../services/registerForm'

const Payment = () => {
  const [formData, setFormData] = useState({
    data: '',
    signature: '',
  });

  useEffect(() => {
    const HashiInfo = async () => {
      try {
        const Info = await userService.hash();
        const data = Info.data;
        const signature = Info.signature;

        setFormData({
          data,
          signature,
        });
      } catch (error) {
        console.error('Error fetching hash info:', error);
      }
    };

    HashiInfo();
  }, []); // initial render

  return (
    <>
      <form method="POST" action="https://www.liqpay.ua/api/3/checkout" acceptCharset="utf-8">
        <input type="hidden" name="data" value={formData.data} />
        <input type="hidden" name="signature" value={formData.signature} />
        <input type="image" src="//static.liqpay.ua/buttons/p1ru.radius.png" alt="Pay with Liqpay" />
      </form>
    </>
  );
};

export default Payment;
