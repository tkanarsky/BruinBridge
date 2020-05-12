import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import { css } from "emotion";

const StyledLink = styled(Link)`
  font-size: 18px;
  margin: 30px;
  box-sizing: border-box;
  color: black;

  &:hover {
  }
`;

const Container = styled("div")`
  background-color: #fff7cc;
  height: 30px;
`;

// TO-DO: make a const css component to make the "My Profile" Link align to the right of the screen

export default class NavBar extends React.Component {
  render() {
    return (
      <Element
        name="navbar"
        classname={css`
          position: sticky;
          top: 0;
          z-index: 100000;
        `}
      >
        <Container>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/forum">Forum</StyledLink>
          <StyledLink to="/mentor">My Mentor</StyledLink>
          <StyledLink to="profile">My Profile</StyledLink>
        </Container>
      </Element>
    );
  }
}
