import React from "react";
import PostDisplayMain from "../components/PostDisplayMain.jsx";
import HomeHeader from "../components/HomeHeader.jsx";
import PhotographerExperience from "../components/PhotographerExperience";
import PostCreate from "../components/PostCreate.jsx";
import "bootstrap/dist/css/bootstrap.min.css"

const Home = () => {
  return (
    <div className="d-block">
      <HomeHeader />
      <PostCreate />
      <PhotographerExperience />
      <PostDisplayMain />
    </div>
  );
};

export default Home;
