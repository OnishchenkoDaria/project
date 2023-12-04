import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/posts'

const get = (id) => axios.get(`${baseUrl}/${id}`).then(response => response.data)

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newPost => axios.post(baseUrl, newPost).then(response => response.data)

const update = (id, newPost) => axios.put(`${baseUrl}/${id}`, newPost).then(response => response.data)

export default { get, getAll, create, update }