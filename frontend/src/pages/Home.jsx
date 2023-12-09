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
import HomeFooter from '../components/HomeFooter.jsx'

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

    <div>
            <HomeHeader />
            <Navbar />
            <PhotoCarousel />
            <PhotographerExperience />
            <BlogList />
            <OrderButton />
            <HomeFooter />
            
        </div>
  );
}

export default Home;