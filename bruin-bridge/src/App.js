import React from "react";
import logo from "./logo.svg";
import LandingPage from "./pages/LandingPage";
import ForumPage from "./pages/ForumPage";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <LandingPage></LandingPage>
          <Route exact path="/forum">
            <ForumPage></ForumPage>
          </Route>
          <Route exact path="/profile">
            <ProfilePage></ProfilePage>
          </Route>
          <div className="fill-window"></div>
        </Router>
      </div>
    );
  }
}

export default App;
