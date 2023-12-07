import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/posts'

const get = async (id) => axios.get(`${baseUrl}/${id}`).then(response => response.data)

const getAll = async () => axios.get(baseUrl).then(response => response.data)

const create = async (newPost) => axios.post(baseUrl, newPost).then(response => response.data)

const update = async (id, newPost) => axios.put(`${baseUrl}/${id}`, newPost).then(response => response.data)

export default { get, getAll, create, update }