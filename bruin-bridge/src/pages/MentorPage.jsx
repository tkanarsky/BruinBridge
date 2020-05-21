import React from "react";
import styled from "styled-components";


const Button = styled("button")`
  display: flex;
  background-color: #fff7cc;
  border: 1px solid #ffd600;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 200px;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
  font-family: "Open Sans";
  font-weight: bold;
  justify-content: center;
  align-items: center;
  margin: 20px;

  &:hover {
    cursor: pointer;
  }
`;

export default class MentorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mentorRef: null,
      mname: "Bob",
      mmajor: "Computer Science",
      myear: "2022",
      mbio: "I love UCLA!",
      minterest1: "Gaming",
      minterest2: "Music",
      minterest3: "Art"
    };

  }
  
  render() {
    return (
      <div
        style={{
          backgroundColor: "#ADE1FF",
          width: "100%",
          height: "100vh"
        }}
      >
        <h1>Mentor page</h1>
        <h2>Name: {this.state.mname}</h2>
        <h2>Major: {this.state.mmajor}</h2>
        <h2>Graduation Year: {this.state.myear}</h2>
        <h2>Bio: {this.state.mbio}</h2>
        <h2>Interests: {this.state.minterest1}, {this.state.minterest2}, {this.state.minterest3}</h2>
        <Button /*onClick={this.props.login}*/>Chat With Mentor</Button>
      </div>
    );
  }
}
