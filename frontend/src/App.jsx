import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/'
import userService from './services/register'

//import {useEffect} from 'react'


const App = () => {
    
  const[formInput, setFormInput] = useState({
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
    
    axios
      .post(baseUrl+'add',formInput)
      .then(function(res) {
        console.log(res , "user added!")
      })
      .catch(function(error){
        console.log(error , 'failed registration')
      })
      
    /*useEffect(() => {
      userService.addUser(formInput)
    }, [])*/
    
      /*{.then(response => {
        console.log(response.data , 'success!')
      })
      .catch(error => {
        console.log('fail')
      })}*/
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input name="name" value={formInput.name} onChange={handleChange} placeholder="Name" required />
      <br/>
      <input name="email" value={formInput.email} onChange={handleChange} placeholder="Email" required/>
      <br/>
      <input name="password" value={formInput.password} onChange={handleChange} placeholder="Password" autoComplete='off' required/>
      <br/>
      <button type="submit">Submit</button>
      <br/>
    </form>
    </>
  )
}

export default App
