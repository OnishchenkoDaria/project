import axios from 'axios'
const baseUrl = 'http://localhost:3001/'

axios.defaults.withCredentials = true; // Include credentials (like cookies) in the request
axios.defaults.crossDomain = true; // Enable cross-domain requests

const addUser = async (newUser) => {
    const result = axios.post(baseUrl+'add', newUser)
    
    //if post call is success the next code is executed
    try{
        console.log((await result).data.message)        
        console.log('The user created is ', newUser)
        return true;
    }

    //if error is found (f.e. email duplication) - the following is executed
    catch(error){
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
        return false;
    }     
}

const loginUser = async (newUser) => {
    const result = axios.post(baseUrl+'log-in', newUser)
    try{
        console.log((await result).data.message)
        console.log('Successful login ', newUser)
        return true
    }
    catch(error){
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
        return false
    }
}

const getUser = async () => {
    const result = await axios.get(baseUrl+'user')
    try{
        const user = result.data
        console.log('User:', user)
    }catch(err){
        console.error('Get User error:', err)
    }
}

const LogOut = async () => {
    await axios.post(baseUrl+'log-out')
    try{
        console.log('Logged out');
    }catch(err){
        console.error('Logout error:', err)
    }
}


export default{
    addUser: addUser,
    loginUser: loginUser,
    getUser: getUser,
     LogOut: LogOut
}



/*
axios
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
        })
*/