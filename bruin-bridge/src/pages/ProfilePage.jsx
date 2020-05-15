import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import { majors } from "./majors";

const Container = styled("div")`
  background-color: white;
  width: 95%;
  display: flex;
  justify-content: center;
  border-radius: 25px;
  margin-left: 2%;
  margin-right: 2%;
  padding-top: 50px;
`;

const BoldInfo = styled("div")`
  font-family: "Open Sans";
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  padding: 20px;
`;

// this.props.userInfo is an array of all the data of the user
export default class ProfilePage extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#ADE1FF",
          width: "100%",
          height: "100vh"
        }}
      >
        <Container>
          {this.props.userInfo ? (
            <div>
              <img
                src={this.props.userInfo.photoURL}
                className={css`
                  border-radius: 50%;
                  height: 200px;
                  width: 200px;
                `}
              />
              <BoldInfo>{this.props.userInfo.displayName}</BoldInfo>
            </div>
          ) : (
            <div>No Name Found</div>
          )}
        </Container>
      </div>
    );
  }
}
