import React, { Fragment, useRef } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

function LandingPage({ isAuthenticated }) {

  const card = useRef()
  const title = useRef()
  const image = useRef()

  if (isAuthenticated) {
    return <Redirect to="/posts" />;
  }
  function handleMouseMove(e) {
    if (window.innerWidth >= 900) {
      let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
      let yAxis = (window.innerWidth / 2 - e.pageY) / 20;
      card.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
  }
  function handleMouseLeave() {
    if (window.innerWidth >= 900) {
      image.current.style.transform = "translateZ(0px)  rotate(0deg)";
      card.current.style.transition = "all 0.5s ease";
      card.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
      title.current.style.transform = "translateZ(0px)";
    }
  }
  function handleMouseEnter() {
    if (window.innerWidth >= 900) {
      card.current.style.transition = "none";
      image.current.style.transform = "translateZ(100px) rotate(0deg)";
      title.current.style.transform = "translateZ(100px)";
    }
  }
  return (
    <Fragment>
      <div className="landing pt-1">
        <div
          className="landing-container"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card" ref={card}>
            <div className="disp pt-1">
              <div className="circle"></div>
              <img src="./codeLogo.png" alt="Programming Languages" ref={image} />
            </div>
            <div className="info">
              <h1 className="title x-large" ref={title}>CodeCertify</h1>
              <h3 className="lead pad-mob-1x">
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
