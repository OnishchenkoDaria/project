import axios from 'axios'
const baseUrl = 'http://localhost:3001/users/'

axios.defaults.withCredentials = true; // Include credentials (like cookies) in the request
axios.defaults.crossDomain = true; // Enable cross-domain requests

const addUser = async (newUser) => {
    const result = axios.post(baseUrl+'add', newUser)
    const feedback = {success:'',message:''}
    //if post call is success the next code is executed
    try{
        feedback.message=(await result).data.message
        console.log(feedback.message)        
        console.log('The user created is ', newUser)
        feedback.success=true
        return feedback;
    }

    //if error is found (f.e. email duplication) - the following is executed
    catch(error){
        if (error.response){
            console.error('server send back an error status:', error.response.status);
            console.error('error message from server:', error.response.data.error);
            feedback.message=error.response.data.error
        }
        else if (error.request){
            console.error('no response received from the server');
        }
        else{ 
           console.error('error during request setup:', error.message);
        }
        feedback.success=false
        return feedback;
    }     
}

const loginUser = async (newUser) => {
    const result = axios.post(baseUrl+'log-in', newUser)
    const feedback = {success:'',message:''}
    try{
        feedback.message = (await result).data.message
        console.log(feedback.message)
        console.log('Successful login ', newUser)
        feedback.success=true
        return feedback
    }
    catch(error){
        if (error.response){
            console.error('server send back an error status:', error.response.status);
            console.error('error message from server:', error.response.data.error);
            feedback.message=error.response.data.error
        }
        else if (error.request){
            console.error('no response received from the server');
        }
        else{ 
           console.error('error during request setup:', error.message);
        }
        feedback.success = false
        return feedback
    }
}

const getUser = async () => {
    const result = await axios.get(baseUrl+'user')
    try{
        const user = result.data
        console.log('User:', user)
    }catch(error){
        console.error('Get User error:', error)
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
    }catch(error){
        console.error('Logout error:', error)
        return false
    }
}

const hash = async(value) => {
    console.log(value)
    const result = await axios.post(baseUrl + 'hashing', {value});
    try{
        const { data, signature } = result.data;

        console.log('Data:', data);
        console.log('Signature:', signature);
        return result.data
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
    }
}

const paymentTable = async() => {
    const result = await axios.post(baseUrl+'get-table')
    try{
        console.log(result.data)
        return result.data
        
    } catch(error){
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
    }
}

export default{
    addUser: addUser,
    loginUser: loginUser,
    getUser: getUser,
    getRole: getRole,
    logOut: logOut,
    hash: hash,
    paymentTable: paymentTable
}