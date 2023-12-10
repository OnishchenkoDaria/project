import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/posts'

const getPost = async (id) => axios.get(baseUrl + `/${id}`).then(response => response.data)

const getAllPosts = async () => axios.get(baseUrl).then(response => response.data)

const createPost = async (newPost) => axios.post(baseUrl, newPost).then(response => response.data)

const deletePost = async (id) => axios.delete(baseUrl + `/${id}`).then(response => response.data)

const updatePost = async (id, newPost) => axios.patch(baseUrl + `/${id}`, newPost).then(response => response.data)

export default { getPost, getAllPosts, createPost, deletePost, updatePost }