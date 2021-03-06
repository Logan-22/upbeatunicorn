import React from "react";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={Login} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
