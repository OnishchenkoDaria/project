import React from "react";
import "../styles/Form.css";
import { Link } from "react-router-dom";
import PathConstants from "../routes/pathConstants";
import PostCreate from '../components/PostCreate.jsx'
import PostDisplayMain from '../components/PostDisplayMain.jsx';
import postService from '../services/posts.js'
import registerService from '../services/registerForm.js';
import Header from '../components/Header';
import Navbar from "../components/Navbar";
import PhotographerExperience from "../components/PhotographerExperience";
import BlogList from "../components/BlogList";
import OrderButton from "../components/OrderButton";
import HomeHeader from '../components/HomeHeader.jsx';
import PostDisplayMain from "../components/PostDisplayMain.jsx";
import ImageCarousel from "../components/ImageCarousel.jsx";

const Home = () => {
  return (
    <div>
            {/* <HomeHeader /> */}
            {/* <Navbar /> */}
            <OrderButton />
            <PhotographerExperience />
            <PostDisplayMain />
            <OrderButton />
            
        </div>
  );
};

export default Home;
