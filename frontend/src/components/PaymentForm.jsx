
import "../styles/Header.css"

const baseUrl = 'http://localhost:3001/'
import React, { useEffect, useState } from 'react';
//import sha1 from 'crypto-js/sha1';
import keys from './keys'

const PaymentForm = () => {
    const { private: privateKey, public: publicKey } = keys.keys;  
    const [formData, setFormData] = useState({
    data: '',
    signature: '',
  });

  async function sha1(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
  
    // Use the SubtleCrypto API to generate a SHA-1 hash
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  
    // Convert the hash buffer to a hex string or any other representation you need
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  }

  useEffect(() => {
    const CheckProperties = () => {
      // LiqPay widget in client-server schema
      const json_string = {
        "public_key": publicKey,
        "version": "3",
        "action": "pay",
        "amount": "3",
        "currency": "UAH",
        "description": "test",
        "order_id": "00001"
      };
      console.log('after json_string',json_string.public_key)
      const jsonString = JSON.stringify(json_string);
      const data = btoa(jsonString);

      // Forming the signature
      const private_key = privateKey
      const sign_string = private_key + data + private_key;

      console.log("Data:", data);
      console.log("Signature String:", sign_string);

      
      sha1(sign_string).then(hash => {
        console.log(hash)
        console.log(sha1Hash)
      
        const base64Signature = btoa(sha1Hash);
        console.log(base64Signature)
        const signature = base64Signature;
        console.log(signature)

        setFormData({
            data,
            signature,
        });
      })
      
    };

    // Call the function to set form data
    CheckProperties();
  }, []); // the initial render

  /*const handleButtonClick = () => {
    CheckProperties();
  };*/

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
