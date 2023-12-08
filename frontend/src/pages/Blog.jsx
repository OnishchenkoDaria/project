import React from 'react';
import { useState, useEffect } from 'react' 
import postService from '../services/posts.js'
import registerService from '../services/registerForm.js'
import PostDisplayBlog from '../components/PostDispalyBlog.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'


const Blog = () => {
  
  return (
    <div>
      <PostDisplayBlog />
    </div>
  );
}

export default Blog;