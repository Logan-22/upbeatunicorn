import React, { useEffect } from "react";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Spinner from "./components/layout/Spinner";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import PostForm from "./components/posts/PostForm";
import { connect } from "react-redux";

function Collection({ theme }) {
  useEffect(() => {
    document.getElementById("dynamicCheck").checked =
      localStorage.getItem("darkmode") === "true";
  }, []);

  return (
    <Router>
      <div className={theme}>
        <div className="main-grid">
        <Nav />
        <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/spinner" component={Spinner} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <PrivateRoute
            exact
            path="/add-post"
            component={PostForm}
          />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/posts/:id" component={Post} />
        </Switch>
        </div>
        </div>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme
});

export default connect(mapStateToProps)(Collection);
