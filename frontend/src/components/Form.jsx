import { useEffect, useState } from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/'
import userService from '../services/registerForm'

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

        /*UserInfo.append('username', formInput.name) 
        UserInfo.append('useremail', formInput.email) 
        UserInfo.append('userpassword', formInput.password) */
        
        console.log('UserInfo',UserInfo)
        
        //console.log(formInput)
        userService.addUser(UserInfo)
        
        setFormInput({
            name: '', 
            email:'', 
            password: ''
        })



       /* axios
        .post(baseUrl+'add',formInput)
        .then((res) => {
            console.log(res.data.message)
        })
        .catch((error) => {
            if (error.response){
            console.error('server send back an error status:', error.response.status);
            console.error('error message from server:', error.response.data.error);
            }
            else if (error.request){
            console.error('no response received from the server');
            }
            else{ 
            console.error('error during request setup:', error.message);
            }
            //console.log(<p>{error.data}</p> , "registration failed");
        })*/
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
          <input name="name" value={formInput.name} onChange={handleChange} placeholder="Name" required />
          <br/>
          <input name="email" value={formInput.email} onChange={handleChange} placeholder="Email" required/>
          <br/>
          <input name="password" value={formInput.password} onChange={handleChange} placeholder="Password" autoComplete='off' required/>
          <br/>
          <button type="submit">Submit</button>
          <p></p>
          <br/>
        </form>
        </>
    )
}

export default RegistrationForm