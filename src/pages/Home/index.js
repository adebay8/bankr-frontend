import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import playStoreImage from "../../assets/google-play-badge.png";
import appStoreImage from "../../assets/app-store.svg";

const Home = () => {
  return (
    <>
      <section className="banner">
        <div className="banner-text--container">
          <h1>We're the New Era of Banking Apps</h1>
          <span>
            Exchange money with no hidden fees. Buy crypto, gold and manage your
            money with spending analytics. Join over 15 million Bankr customers.
          </span>
          <div className="dflex align-center button-container">
            <Link to="#">
              <img src={playStoreImage} alt="" className="action-button" />
            </Link>
            <Link to="#">
              <img src={appStoreImage} alt="" className="action-button-apple" />
            </Link>
          </div>
        </div>
        <div className="web-app--images">
          <div className="banner-mobile--image__container">
            <img
              src="https://iflux.app/static/media/banner-iphone-mockup.8e204f52.webp"
              alt="flux on a large screen display device"
              className="banner-mobile--image"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
