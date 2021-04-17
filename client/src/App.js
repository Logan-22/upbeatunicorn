import React, { useEffect } from "react";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Footer from "./components/Footer";
import "./dist/css/styles.min.css";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import { loadTheme } from "./actions/theme";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

//*Redux Components
import { Provider } from "react-redux"; //*Provider connects the react and redux parts.
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  //* Each time component is rendered , this useEffect hook is triggered.
  useEffect(() => {
    store.dispatch(loadUser()); //* Actions are dispatched only by accessing the store directly .. since we have access to the store here...
    store.dispatch(loadTheme());
    document.getElementById("dynamicCheck").checked =
      localStorage.getItem("darkmode") === "true";
  }, []); //* [] -> Represent the useEffect hook is run onMount of each component..

  return (
    <Provider store={store}>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profiles" component={Profiles} />
          <Route path="/profile/:id" component={Profile} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/create-profile" component={CreateProfile} />
          <PrivateRoute path="/edit-profile" component={EditProfile} />
          <PrivateRoute path="/add-experience" component={AddExperience} />
          <PrivateRoute path="/add-education" component={AddEducation} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </Provider>
  );
}

export default App;
