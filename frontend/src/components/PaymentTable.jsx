import React, { useEffect, useState } from 'react';
import userService from '../services/registerForm';
import Table from 'react-bootstrap/Table';

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
      <div style={{textAlign: 'center'}}>
        <p>Processing data from liqpay server may take some time, refresh page periodically</p>
        <h2>Your Orders</h2>

        {tableData.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <Table>
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
          </Table>
        )}
      </div>
    </>
  );
};

export default PaymentTable;
