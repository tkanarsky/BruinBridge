import React from "react";
import styled from "styled-components";

const Container = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default class LandingPage extends React.Component {
  render() {
    return (
      <>
        <Container>Bruin Bridge</Container>
      </>
    );
  }
}
