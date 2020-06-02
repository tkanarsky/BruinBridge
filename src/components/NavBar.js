import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import { css } from "emotion";
import { getUser } from "../database/userDatabase";

const StyledLink = styled(Link)`
  position: relative;
  font-size: 18px;
  font-family: 'Balsamiq Sans', "Open Sans", sans-serif;
  text-decoration: none;
  color: black;
  transition: 0.25s all ease;
  &:hover {
    font-size: 22px;
  }
`;

const ClickableText = styled("a")`
  position: relative;
  cursor: pointer;
  font-size: 18px;
  font-family: 'Balsamiq Sans', "Open Sans", sans-serif;
  text-decoration: none;
  color: black;
  transition: 0.25s all ease;
  &:hover {
    font-size: 22px;
  }
`

const LHSBox = styled("div")`
  height: 100%;
  text-align: center;
  margin: 15px;
  margin-right: 30px;
  margin-left: 30px;
`;

const DummyFiller = styled("div")`
  margin-left: auto;
  margin-right: auto;
`;
const RHSBox = styled(LHSBox)`
  justify-self: flex-end;
  margin-left: 30px;
  margin-right: 30px;
`;

const Container = styled("div")`
  display: flex;
  flex-direction: right;
  background-color: #fff7cc;
  width: 100%;
  height: 100%;
`;


// TO-DO: make a const css component to make the "My Profile" Link align to the right of the screen

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      m: "",
    }
    this.loadUser = this.loadUser.bind(this);
  };
  
loadUser(){
  if (this.props.user) {
    let u = this.props.user;
    let uid = u.uid;
    getUser(uid, userData => {
      if (userData.is_mentor){
        this.setState({m: "My Mentee"});
      }
      else {
        this.setState({m: "My Mentor"});
      }
    });
    this.setState({ loaded: true });
  }
}

  render() {
    if (!this.state.loaded) {
      this.loadUser();
    }
    return (
      <Element
        name="navbar"
        className={css`
          position: sticky;
          top: 0;
          z-index: 100000;
        `}
      >
        <Container>
          <LHSBox><StyledLink to="/">Home</StyledLink></LHSBox>
          <LHSBox><StyledLink to="/forum">Forum</StyledLink></LHSBox>
          {this.props.user &&
          <LHSBox><StyledLink to="/mentor">{this.state.m}</StyledLink></LHSBox>
          }
          <DummyFiller />
          {this.props.user && 
          <RHSBox><StyledLink to="profile">My Profile</StyledLink></RHSBox>
          }
          {this.props.user && 
          <RHSBox><ClickableText onClick={this.props.logout}>Sign Out</ClickableText></RHSBox>
          }
          {!this.props.user && 
          <RHSBox><ClickableText onClick={this.props.loginAsMentor}>Be a Mentor</ClickableText></RHSBox>
          }
          {!this.props.user && 
          <RHSBox><ClickableText onClick={this.props.loginAsMentee}>Find a Mentor</ClickableText></RHSBox>
          }
        </Container>
      </Element>
    );
  }
}
