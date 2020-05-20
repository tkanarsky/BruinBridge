import React from "react";
import LandingPage from "./pages/LandingPage";
import ForumPage from "./pages/ForumPage";
import ProfilePage from "./pages/ProfilePage";
import MentorPage from "./pages/MentorPage";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { auth, provider, database, userExists } from "./firebase.js";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
  }

  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      //this.setState({ user });
      if (!userExists(user.uid)) {
        this.createNewUser(this.state.user);
      }
    });
  }

  createNewUser(user) {
    if (user == null) return;
    database.ref("users/" + user.uid).set({
      name: user.displayName,
      email: user.email,
      major: "",
      year: "",
      bio: "",
      karma: 0
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
        {/* {!this.state.user && <p>Loading...</p>}
        {this.state.user && ( */}
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <LandingPage
                userInfo={this.state.user}
                login={this.login}
                logout={this.logout}
              ></LandingPage>
            </Route>
            <Route exact path="/forum">
              <ForumPage></ForumPage>
            </Route>
            <Route exact path="/mentor">
              <MentorPage></MentorPage>
            </Route>
            <Route exact path="/profile">
              <ProfilePage user={this.state.user}></ProfilePage>
            </Route>
            <div className="fill-window"></div>
          </Switch>
        </Router>
        )}
      </div>
    );
  }
}

export default App;
