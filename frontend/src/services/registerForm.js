import axios from 'axios'
const baseUrl = 'http://localhost:3001/users/'

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

const getRole = async() => await axios.get(baseUrl + 'get-role/').then(response => response.data)

const logOut = async () => {
    console.log('1')
    const result = axios.post(baseUrl+'log-out')
    console.log('2')
    try{
        console.log('3')
        console.log((await result).data.message)
        console.log('Logged out');
        return true
    }catch(err){
        console.error('Logout error:', err)
        return false
    }
}

const hash = async() => {
    const result = await axios.post(baseUrl + 'hashing');
    try{
        const { data, signature } = result.data;

        console.log('Data:', data);
        console.log('Signature:', signature);
        return result.data
    }
    catch(err){
        console.error('Error:', err);
    }
}


export default{
    addUser: addUser,
    loginUser: loginUser,
    getUser: getUser,
    getRole: getRole,
    logOut: logOut,
    hash: hash
}