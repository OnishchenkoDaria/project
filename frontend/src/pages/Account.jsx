import React from 'react';
import userService from '../services/registerForm'
import "../styles/Form.css"

const Account = () => {
  //const navigate = useNavigate();
  //успішне session authentication перевірка
  //пфсля оновлення видає інфу про юзера що зарегався до цього
  //навіть після перелогіну - видає логін вже новозалогіненого юзера
  //після connection break із сервером (xampp) всі дані щезають
  const checkUser = () => {
    console.log('summoned')
    userService.getUser()
  }

  const checkOut = () => {
      console.log('logging out')
      userService.LogOut()
  }

  return (
    <div className="text">
      <form onSubmit={checkUser} className="registration-form">
        <p>Button for session authentication check</p>
        <button type='submit' className="submit-button">Check</button>
      </form>
      <form onSubmit={checkOut} className="registration-form">
        <p>Button for log out session check</p>
        <button type='submit' className="submit-button">Log out</button>
      </form>
    </div>
  );
}

export default Account;