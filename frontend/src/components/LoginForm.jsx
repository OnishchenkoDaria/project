import { useState } from 'react'
import userService from '../services/registerForm'
import "../styles/Form.css"
import { useNavigate } from 'react-router-dom'
import PathConstants from '../routes/pathConstants'

const LoginForm = () => {

    const navigate = useNavigate();
        
    const [formInput, setFormInput] = useState({ 
            email:'', 
            password: ''
    })

    const handleChange = (par) => {
        const{name , value} = par.target
        setFormInput({...formInput, [name]:value})
    }

    const handleSubmit = async(par) => {
        try{
           par.preventDefault()

           function newUser() {
            this.useremail= formInput.email;
            this.userpassword = formInput.password;
            }
            const UserInfo = new newUser()

            await userService.loginUser(UserInfo)
            navigate(PathConstants.ACCOUNT)
        
        }
        catch(err){
            console.log("error caught")
            throw err
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit} className="registration-form">
            <p>Log in</p>
            <input className="input-field" name="email" value={formInput.email} onChange={handleChange} placeholder="Email" required></input>
            <br/>
            <input className="input-field" name="password" value={formInput.password} onChange={handleChange} placeholder="Password" autoComplete='off' required></input>
            <br/>
            <button className="submit-button" type="submit">Submit</button>
            </form>
        </>
    )
}
export default LoginForm;

/*<form onSubmit={handleSubmit} className="registration-form">
          <p>Registration</p>
          <input className="input-field" name="name" value={formInput.name} onChange={handleChange} placeholder="Name" required />
          <br/>
          <input className="input-field" name="email" value={formInput.email} onChange={handleChange} placeholder="Email" required/>
          <br/>
          <input className="input-field" name="password" value={formInput.password} onChange={handleChange} placeholder="Password" autoComplete='off' required/>
          <br/>
          <button className="submit-button" type="submit">Submit</button>
          <br/>
        </form>*/