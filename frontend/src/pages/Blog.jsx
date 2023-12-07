import React from 'react';
import { useState, useEffect } from 'react' 
import postService from '../services/posts.js'
import PostDisplayBlog from '../components/PostDispalyBlog.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'

const cards = await postService.getAll()

const Blog = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const updatePosts = async () => {
      setPosts(await postService.getAll())
    }
    updatePosts()
  }, [])
  return (
    <div>
      <PostDisplayBlog posts={posts}/>
    </div>
  );
}

export default Blog;