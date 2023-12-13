import React, { useEffect, useState } from 'react';
import userService from '../services/registerForm';
import '../styles/Form.css';

const PaymentTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userService.paymentTable();
        console.log(result);
        setTableData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <>
      <div className='registration-form'>
        <p>Processing data from liqpay server may take some time</p>
        <h2>Your Orders</h2>

        {tableData.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Price</th>
                <th>Email</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(row => (
                <tr key={row.id}>
                  <td>{row.price}</td>
                  <td>{row.email}</td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default PaymentTable;
