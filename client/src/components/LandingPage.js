import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
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
      const python = document.querySelector(".python img");
      python.style.transform = "translateZ(0px)  rotate(0deg)";
      card.style.transition = "all 0.5s ease";
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
      title.style.transform = "translateZ(0px)";
    }
  }
  function handleMouseEnter(e) {
    if (window.innerWidth >= 768) {
      const card = document.querySelector(".card");
      const python = document.querySelector(".python img");
      const title = document.querySelector(".title");
      card.style.transition = "none";
      python.style.transform = "translateZ(100px) rotate(0deg)";
      title.style.transform = "translateZ(100px)";
    }
  }
  return (
    <div className="threeDim">
      <div
        className="container"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card">
          <div className="python">
            <div className="circle"></div>
            <img src="./python.png" alt="Python" />
          </div>
          <div className="info">
            <h1 className="title">Python 3.0</h1>
            <h3>Learn Python - PCAP Certification</h3>
            <div className="buttons">
              <Link to="/login">
                <button>Log In</button>
              </Link>
              <Link to="/signup">
                <button className="active">Sign Up</button>
              </Link>
            </div>
            <div className="try">
              <button>Try Before Signing Up!!!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;