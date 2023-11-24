import { useState } from 'react'
import userService from '../services/registerForm'
import "../styles/Form.css"

const RegistrationForm = () => {

    //add states like [registrationSuccess, serRegistrationSuccess]
    //in case of successful usel registration set the state
    //redirect using <Link> --- add the ButtonSubmit function which would redirect the user in case of state is true
    //otherwise not - or even pops up the message what is wrong
    const [registrationSuccess, setRegistrationSuccess]=useState(false)
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