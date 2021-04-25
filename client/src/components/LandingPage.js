import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

function LandingPage({ isAuthenticated, theme }) {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  function handleMouseMove(e) {
    if (window.innerWidth >= 768) {
      const card = document.querySelector(".card");
      let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
      let yAxis = (window.innerWidth / 2 - e.pageY) / 20;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
  }
  function handleMouseLeave(e) {
    if (window.innerWidth >= 768) {
      const title = document.querySelector(".title");
      const card = document.querySelector(".card");
      const python = document.querySelector(".disp img");
      python.style.transform = "translateZ(0px)  rotate(0deg)";
      card.style.transition = "all 0.5s ease";
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
      title.style.transform = "translateZ(0px)";
    }
  }
  function handleMouseEnter(e) {
    if (window.innerWidth >= 768) {
      const card = document.querySelector(".card");
      const python = document.querySelector(".disp img");
      const title = document.querySelector(".title");
      card.style.transition = "none";
      python.style.transform = "translateZ(100px) rotate(0deg)";
      title.style.transform = "translateZ(100px)";
    }
  }
  return (
    <Fragment>
      <div className="landing">
        <div
          className="landing-container"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card pt-1">
            <div className="disp">
              <div className="circle"></div>
              <img src="./codeLogo.png" alt="Programming Languages" />
            </div>
            <div className="info">
              <h1 className="title x-large">CodeCertify</h1>
              <h3 className="lead">
                Get Certified by our curated certification <br />Q & A's
              </h3>
              <div>
                <Link to="/login" className="btn landing-btn btn-1">
                  Log In
                </Link>
                <Link to="/signup" className="btn landing-btn btn-2">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(LandingPage);
