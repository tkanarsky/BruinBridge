import React from "react";
import styled from "styled-components";

export const Button = styled("button")`
  display: flex;
  background-color: #fff7cc;
  border: 1px solid #ffd600;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 200px;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
  font-family: 'Balsamiq Sans', "Open Sans", sans-serif;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  margin: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const ButtonContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20%;
`;

const Caption = styled("div")`
  font-family: 'Balsamiq Sans', "Open Sans", sans-serif;
  font-size: 25px;
  text-align: center;
  padding-top: 40px;
`;

// const BouncingArrow = styled("div")`
//   position: absolute;
//   margin: auto;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   width: 40px;
//   height: 30px;
//   font-size: 60px;
//   line-height: 20px;
//   color: #ffd600;
//   animation: bounce 2s infinite ease-in-out;

//   @keyframes bounce {
//     0%,
//     20%,
//     60%,
//     100% {
//       -webkit-transform: translateY(0);
//     }
//     40% {
//       -webkit-transform: translateY(-20px);
//     }
//     80% {
//       -webkit-transform: translateY(-10px);
//     }
//   }
// `;

const Img = styled("div")`
  background-image: url("https://lh3.googleusercontent.com/04HhWSw7Ml6nwcG3wDTCN66CTEP8WZQ7j71CFI4GC7UdKM9_yGnvyumwUb5uEXPigIlU959cregu-Gkk4XvxC8_fCf5btewzt1nXO-myC43FkbOvVFu9DYloNfdk5fzMu8wYCkKvYQ");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  width: 50%;
`;

const RightContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-left: 50px;
  padding-right: 50px;
  justify-content: center;
  align-content: center;
`;

const Container = styled("div")`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #ade1ff;
`;

export default class LandingPage extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Img></Img>
          <RightContainer>
            <Caption>
              Bridging the gap between prospective bruins and current bruins.
            </Caption>
            <ButtonContainer>
              {this.props.userInfo ? (
                <Button onClick={this.props.logout}>Sign Out</Button>
              ) : (
                <div>
                  <Button onClick={this.props.loginAsMentor}>
                    Be a Mentor
                  </Button>
                  <Button onClick={this.props.loginAsMentee}>
                    Find a Mentor
                  </Button>
                </div>
              )}
              <Img></Img>
            </ButtonContainer>
            {/* <BouncingArrow>&#8964;</BouncingArrow> */}
          </RightContainer>
        </Container>
      </>
    );
  }
}
