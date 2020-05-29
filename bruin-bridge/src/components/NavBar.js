import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import { css } from "emotion";

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

const LinkBox = styled("div")`
  height: 100%;
  text-align: center;
  margin: 15px;
  margin-right: 30px;
  margin-left: 30px;
`;

const ProfileBox = styled(LinkBox)`
  margin-left: auto;
  justify-self: flex-end;
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
  render() {
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
          <LinkBox><StyledLink to="/">Home</StyledLink></LinkBox>
          <LinkBox><StyledLink to="/forum">Forum</StyledLink></LinkBox>
          <LinkBox><StyledLink to="/mentor">My Mentor</StyledLink></LinkBox>
          <ProfileBox><StyledLink to="profile">My Profile</StyledLink></ProfileBox>
        </Container>
      </Element>
    );
  }
}
