import React from 'react';
import { useState, useEffect } from 'react' 
import "../styles/Form.css"
import {Link} from "react-router-dom"
import PathConstants from "../routes/pathConstants";
import PostCreate from '../components/PostCreate.jsx'
import PostDisplayMain from '../components/PostDisplayMain.jsx'
import postService from '../services/posts.js'
import registerService from '../services/registerForm.js';
import Header from '../components/Header';
import Navbar from "../components/Navbar";
import PhotoCarousel from "../components/PhotoCarousel";
import PhotographerExperience from "../components/PhotographerExperience";
import BlogList from "../components/BlogList";
import OrderButton from "../components/OrderButton";
import Footer from "../components/Footer";
import HomeHeader from '../components/HomeHeader.jsx';

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const updateData = async () => {
      setIsAdmin(await registerService.getRole() === 'admin')
      setPosts(await postService.getAll())
    }
    updateData()
  }, [])

  return (

    /*<div className="text">
      <button><Link to={PathConstants.PAYMENT}>BUY PHOTOSHOOT</Link></button>
      <PostDisplayMain posts={posts}/>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      <PostCreate isAdmin={isAdmin}/>
    </div>*/

    <div>
            <HomeHeader />
            <Navbar />
            <PhotoCarousel />
            <PhotographerExperience />
            <BlogList />
            <OrderButton />
            
        </div>
  );
}

export default Home;