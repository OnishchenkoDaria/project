import { useState } from 'react'
import userService from '../services/registerForm'
import "../styles/Form.css"
import { useNavigate } from 'react-router-dom'
import PathConstants from '../routes/pathConstants'

const RegistrationForm = () => {

    const navigate = useNavigate();
        
    const [formInput, setFormInput] = useState({
            name: '', 
            email:'', 
            password: ''
    })

    const handleChange = (par) => {
        const{name , value} = par.target
        setFormInput({...formInput, [name]:value})
    }

    const handleSubmit = async (par) => {
        //calling post req with async for proper function fulfillment order
        try{
            par.preventDefault()
            console.log(formInput)
            
            function newUser() {
                this.username = formInput.name;
                this.useremail= formInput.email;
                this.userpassword = formInput.password;
            }
            const UserInfo = new newUser()

            //creating object from state: UserInfo
            console.log('UserInfo', UserInfo)
            
            //calling axios with object UserInfo

            //const response = await userService.addUser(UserInfo) -- 
            //does not work as addUser call does not return anything (neither in try, nor in catch)
            await userService.addUser(UserInfo)
            console.log("try executed")
            navigate(PathConstants.HOME)
        }
        //error handling
        catch(err){
            console.log("catch executed")
            //console.log(err)
            throw err
        }
        
        
        console.log("here")
        setFormInput({
            name: '', 
            email:'', 
            password: ''
        })
        
    }
    
    return(
        <>
        <form onSubmit={handleSubmit} className="registration-form">
          <p>Registration</p>
          <input className="input-field" name="name" value={formInput.name} onChange={handleChange} placeholder="Name" required />
          <br/>
          <input className="input-field" name="email" value={formInput.email} onChange={handleChange} placeholder="Email" required/>
          <br/>
          <input className="input-field" name="password" value={formInput.password} onChange={handleChange} placeholder="Password" autoComplete='off' required/>
          <br/>
          <button className="submit-button" type="submit">Submit</button>
          <br/>
        </form>
        </>
    )
}

export default RegistrationForm