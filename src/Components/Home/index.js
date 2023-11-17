import React from "react";
import Navbar from "../Navbar";
import HomePageSlick from "../HomePageSlick";
import ContactUs from "../ContactUs";
import "./index.css";

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <Navbar />
        <div className="home-page rounded p-3 mt-2 mt-lg-3">
          <HomePageSlick />
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default Home;
