import React from 'react';
import { useState, useEffect } from 'react' 
import "../styles/Form.css"
import {Link} from "react-router-dom"
import PathConstants from "../routes/pathConstants";
import PostCreateButton from '../components/PostCreateButton.jsx'
import PostShowBox from '../components/PostShowBox.jsx'
import postService from '../services/posts.js'
import registerService from '../services/registerForm.js';

const role = await registerService.getRole()
const posts = await postService.getAll()  

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const role = await registerService.getRole()
      const fetchedPosts = await postService.getAll()

      setIsAdmin(role === 'admin')
      setPosts(fetchedPosts)
    }

    fetchData()
  }, [])

  return (

    <div className="text">
      <button><Link to={PathConstants.PAYMENT}>BUY PHOTOSHOOT</Link></button>
      <PostShowBox posts={posts}/>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      <PostCreateButton isAdmin={isAdmin}/>
    </div>
  );
}

export default Home;