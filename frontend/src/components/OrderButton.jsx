import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 15px 30px;
  font-size: 20px;
  background-color: #5b3462;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  margin: 40px auto;

  &:hover {
    background-color: #83518c;
  }
`;

const OrderButton = ({ onClick }) => {
    return (
        <StyledButton onClick={onClick}>
            Замовити
        </StyledButton>
    );
};

export default OrderButton;
