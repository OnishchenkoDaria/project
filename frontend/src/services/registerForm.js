import axios from 'axios'
const baseUrl = 'http://localhost:3001/'

const addUser = async (newUser ) => {
    const result = axios.post(baseUrl+'add', newUser)
    
    //if post call is success the next code is executed
    try{
        console.log((await result).data.message)
               
        console.log('The user created is ', newUser) 
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
    }
        
}

export default{
    addUser
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