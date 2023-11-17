const Form = (props) => {
    return(
      <form method="POST" action="/adduser">
        <label>Username: 
          <input type="text" name="userlogin" placeholder="User" />
        </label>
        <br/>
  
        <label>Your email: 
          <input type="email" name="useremail" placeholder="Email@email.com" />
        </label>
        <br/>
  
        <label>Password:
          <input type="password" name="userpassword" placeholder="1234" />
        </label>
        <br/>
  
        <button type="submit">Submit</button>      
      </form>
    )
}

export default Form
