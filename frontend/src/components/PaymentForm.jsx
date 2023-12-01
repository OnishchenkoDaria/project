import "../styles/Header.css"
import React, { useEffect, useState } from 'react';
import userService from '../services/registerForm'

const PaymentForm = () => {
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


  useEffect(() => {
    // Load LiqPayCheckout script
    const script = document.createElement('script');
    script.src = '//static.liqpay.ua/libjs/checkout.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // LiqPayCheckout is now defined
      window.LiqPayCheckoutCallback = function () {
        console.log("formData.data" , formData.data)
        console.log("formData.signature" , formData.signature)
        
        LiqPayCheckout.init({
          data: formData.data,
          signature: formData.signature,
          embedTo: "#liqpay_checkout",
          language: "ru",
          mode: "embed" // embed || popup
        }).on("liqpay.callback", function (data) {
          console.log(data.status);
          console.log(data);
        }).on("liqpay.ready", function (data) {
          // ready
        }).on("liqpay.close", function (data) {
          // close
        });
      };
    };
  }, [formData]); // Reload the script when formData changes

  return (
    <>
      <div id="liqpay_checkout"></div>
      
    </>
  );
};

export default PaymentForm;
