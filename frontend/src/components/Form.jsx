import { useState } from 'react'
import userService from '../services/registerForm'
import "../styles/Form.css"

const RegistrationForm = () => {
   
    const [formInput, setFormInput] = useState({
            name: '', 
            email:'', 
            password: ''
    })

    const handleChange = (par) => {
        const{name , value} = par.target
        setFormInput({...formInput, [name]:value})
    
        // console.log(formInput)
    }

    const handleSubmit = (par) => {
        par.preventDefault()
        console.log(formInput)
        
        function newUser() {
            this.username = formInput.name;
            this.useremail= formInput.email;
            this.userpassword = formInput.password;
        }
        const UserInfo = new newUser()

        console.log('UserInfo',UserInfo)
        
        userService.addUser(UserInfo)
        
        setFormInput({
            name: '', 
            email:'', 
            password: ''
        })
        
    }
    

    return(
        <>
        <form onSubmit={handleSubmit} class="registration-form">
          <p>Registration</p>
          <input class="input-field" name="name" value={formInput.name} onChange={handleChange} placeholder="Name" required />
          <br/>
          <input class="input-field" name="email" value={formInput.email} onChange={handleChange} placeholder="Email" required/>
          <br/>
          <input class="input-field" name="password" value={formInput.password} onChange={handleChange} placeholder="Password" autoComplete='off' required/>
          <br/>
          <button class="submit-button" type="submit">Submit</button>
          <br/>
        </form>
        </>
    )
}

export default RegistrationForm