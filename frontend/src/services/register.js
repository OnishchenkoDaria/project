import axios from 'axios'
const baseUrl = 'http://localhost:3001/'

const addUser = newObject => {
    return axios.post(baseUrl+'/add', newObject)
}

export default{
    addUser: addUser
}