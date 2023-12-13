import React from 'react';
import "../styles/Form.css"
import {Link} from "react-router-dom"
import PathConstants from "../routes/pathConstants";
import PostCreateButton from '../components/PostCreateButton.jsx'
const Home = () => {
  return (

    <div className="text">
      <button><Link to={PathConstants.PAYMENT}>BUY PHOTOSHOOT</Link></button>
      <PostCreateButton />
      <p> PAYMENT </p>
      <p> BLOG </p>
      <p> TEXT </p>
      <p> CAROUSEL </p>
      <p> PAYMENT </p>
    </div>
  );
}

export default Home;