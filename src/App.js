import React from "react";
import LandingPage from "./pages/LandingPage";
import ForumPage from "./pages/ForumPage";
import ProfilePage from "./pages/ProfilePage";
import MentorPage from "./pages/MentorPage";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReactRouterGlobalHistory } from "react-router-global-history";
import getHistory from "react-router-global-history";
import { auth, provider } from "./database/firebase.js";
import {
  createUser,
  userExists,
  getUser,
  updateUser
} from "./database/userDatabase.js";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      userIsMentor: true
    };
    this.loginAsMentor = this.loginAsMentor.bind(this);
    this.loginAsMentee = this.loginAsMentee.bind(this);
    this.logout = this.logout.bind(this);
  }

  loginAsMentor() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      if (user.email.slice(-10) !== "g.ucla.edu") {
        alert("You must sign in with your UCLA email to be a mentor!");
        auth.signOut().then(() => {
          this.setState({
            user: null
          });
        });
        return;
      }
      userExists(user.uid, value => {
        if (!value) {
          createUser(user, true);
          getHistory().push("/profile");
        } else {
          getUser(user.uid, userData => {
            // In case a user has updated their profile name or photo
            if (
              user.displayName !== userData.name ||
              user.photoURL !== userData.avatar
            ) {
              updateUser(user.uid, {
                avatar: user.photoURL,
                name: user.displayName
              });
            }
          });
          getHistory().push("/forum");
        }
        this.setState({userIsMentor: true});
      });
    });
  }

  loginAsMentee() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      userExists(user.uid, value => {
        if (!value) {
          createUser(user, false);
          getHistory().push("/profile");
        } else {
          getHistory().push("/forum");
        }
        this.setState({userIsMentor: false});
      });
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
      getHistory().push("/");
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
          <ReactRouterGlobalHistory />
          <NavBar user={this.state.user} 
            mentorStatus={this.state.userIsMentor}
            loginAsMentor={this.loginAsMentor}
            loginAsMentee={this.loginAsMentee}
            logout={this.logout}
          />
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
