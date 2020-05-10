import React from "react";
import LandingPage from "./pages/LandingPage";
import ForumPage from "./pages/ForumPage";
import ProfilePage from "./pages/ProfilePage";
import MentorPage from "./pages/MentorPage";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <LandingPage></LandingPage>
          <NavBar />
          <Switch>
            <Route exact path="/forum">
              <ForumPage></ForumPage>
            </Route>
            <Route exact path="/mentor">
              <MentorPage></MentorPage>
            </Route>

            <Route exact path="/profile">
              <ProfilePage></ProfilePage>
            </Route>
            <div className="fill-window"></div>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
