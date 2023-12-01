/*import {Link} from "react-router-dom"
import PathConstants from "../routes/pathConstants";
import "../styles/Header.css"
import { useState } from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/'
import sha1 from 'crypto-js/sha1'

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        data: '',
        signature: '',
    });

    const CheckProperties = () =>{
        //implementing liqpay documentation for widget in client-server schema 
        const json_string = {
            "public_key": "1234",
            "version": "3",
            "action":"pay",
            "amount":"3",
            "currency":"UAH",
            "description":"test",
            "order_id":"00001"
        } 
        const jsonString = JSON.stringify(json_string)
        //data = base64_encode(json_string) 
        const data = btoa(jsonString)  
        console.log(data)
        //forming signature
        const private_key = '123'
        const sign_string = private_key + data + private_key
        console.log(sign_string)
        const sha1Hash = sha1(sign_string)
        const base64Signature = btoa(sha1Hash)
        const signature = base64Signature
        console.log(signature)
        setFormData({
            data,
            signature,
        });
    }
  return (
      <>
        <div id="liqpay_checkout"></div>
        <script>
            window.LiqPayCheckoutCallback = function() {
                LiqPayCheckout.init({
                    data: "eyAidmVyc2lvbiIgOiAzLCAicHVibGljX2tleSIgOiAieW91cl9wdWJsaWNfa2V5IiwgImFjdGlv" +
                    "biIgOiAicGF5IiwgImFtb3VudCIgOiAxLCAiY3VycmVuY3kiIDogIlVTRCIsICJkZXNjcmlwdGlv" +
                    "biIgOiAiZGVzY3JpcHRpb24gdGV4dCIsICJvcmRlcl9pZCIgOiAib3JkZXJfaWRfMSIgfQ==",
                    signature: "QvJD5u9Fg55PCx/Hdz6lzWtYwcI=",
                    embedTo: "#liqpay_checkout",
                    language: "ru",
                    mode: "embed" // embed || popup
                }).on("liqpay.callback", function(data){
                    console.log(data.status);
                    console.log(data);
                }).on("liqpay.ready", function(data){
                    // ready
                }).on("liqpay.close", function(data){
                    // close
                })
            };
        </script>
  <script src="//static.liqpay.ua/libjs/checkout.js" async></script>
      </>
    );
}

export default PaymentForm*/
import React, { useEffect, useState } from 'react';
import sha1 from 'crypto-js/sha1';
import keys from './keys'

const PaymentForm = () => {
    const { private: privateKey, public: publicKey } = keys.keys;  
    const [formData, setFormData] = useState({
    data: '',
    signature: '',
  });

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

      
      const sha1Hash = sha1(sign_string);
      console.log(sha1Hash)
      
      const base64Signature = btoa(sha1Hash);
      console.log(base64Signature)
      const signature = base64Signature;
      console.log(signature)

      setFormData({
        data,
        signature,
      });
    };

    // Call the function to set form data
    CheckProperties();
  }, []); // the initial render

  const handleButtonClick = () => {
    CheckProperties();
  };

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
      <button onClick={handleButtonClick}>Set Form Data</button>
    </>
  );
};

export default PaymentForm;
