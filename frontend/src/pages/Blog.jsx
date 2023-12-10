import React from 'react';
import { useState, useEffect } from 'react' 
import PostDisplayBlog from '../components/PostDispalyBlog.jsx';
import postService from '../services/posts.js'
import registerService from '../services/registerForm'
import 'bootstrap/dist/css/bootstrap.min.css'


const Blog = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [posts, setPosts] = useState([])

  const updateData = async () => {
    setIsAdmin(await registerService.getRole() === 'admin')
    setPosts(await postService.getAllPosts())
  }
  useEffect(() => {
    updateData()
  }, [])

  const handleChange = () => {
    updateData()
  }

  return (
    <div>
      <PostDisplayBlog posts={posts} isAdmin={isAdmin} handleChange={handleChange}/>
    </div>
  );
}

export default Blog;