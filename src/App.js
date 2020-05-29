import React from "react";
import LandingPage from "./pages/LandingPage";
import ForumPage from "./pages/ForumPage";
import ProfilePage from "./pages/ProfilePage";
import MentorPage from "./pages/MentorPage";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth, provider, userExists, createUser } from "./firebase.js";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.loginAsMentor = this.loginAsMentor.bind(this);
    this.loginAsMentee = this.loginAsMentee.bind(this);
    this.logout = this.logout.bind(this);
  }

  loginAsMentor() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      userExists(user.uid, value => {
        if (!value) createUser(user, true);
      });
    });
  }

  loginAsMentee() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      userExists(user.uid, value => {
        if (!value) createUser(user, false);
      });
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <LandingPage
                userInfo={this.state.user}
                loginAsMentor={this.loginAsMentor}
                loginAsMentee={this.loginAsMentee}
                logout={this.logout}
              ></LandingPage>
            </Route>
            <Route exact path="/forum">
              <ForumPage user={this.state.user}></ForumPage>
            </Route>
            <Route exact path="/mentor">
              <MentorPage user={this.state.user}></MentorPage>
            </Route>
            <Route exact path="/profile">
              <ProfilePage user={this.state.user}></ProfilePage>
            </Route>
            <div className="fill-window"></div>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
