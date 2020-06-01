import React from "react";
import styled from "styled-components";
import { getUser } from "../database/userDatabase";
import { matching } from "../database/userDatabase";

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

const MentorContainer = styled("div")`
  width: 20%;
  height: 90%;
  position: sticky;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: white;
  margin-left: 30px;
  margin-right: 10px;
  padding: 25px;
`;

const ChatContainer = styled("div")`
  width: 60%;
  background-color: white;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

const Container = styled("div")`
  position: relative;
  top: 25px;
  display: flex;
  justify-content: center;
`;
export default class MentorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mRef: null,
      mPic: null,
      mname: null,
      mmajor: null,
      myear: null,
      mbio: null,
      mkarma: null,
      minterest1: null,
      minterest2: null,
      minterest3: null
    };
    this.loadData = this.loadData.bind(this);
    this.match = this.match.bind(this);
  }

  match() {
    const { user } = this.props;
    getUser(user.uid, userData => {
      if (userData.is_mentor){
        alert("Error: Must be mentee");
        return;
      }
      alert("hello");
      matching(user.uid);
      this.loadData();
    });
  }

  loadData() {
    const { user } = this.props;
    console.log("load");
    if (user){
      getUser(user.uid, userData => {
        let pair = userData.partner;
        if (pair){
        getUser(pair, userData => {
          this.setState({
            mRef: pair,
            mPic: userData.avatar,
            mname: userData.name,
            mmajor: userData.major,
            myear: userData.year,
            mbio: userData.bio,
            mkarma: userData.karma,
            minterest1: userData.interest1,
            minterest2: userData.interest2,
            minterest3: userData.interest3,
          });
        });
      }
      });
    }
  }


  render() {
    if (!this.state.dataLoaded) {
      this.loadData();
    }
    return (
      <div
        style={{
          backgroundColor: "#ADE1FF",
          width: "100%",
          height: "100vh"
        }}
      >
        {(() => {
          if (this.props.user && this.state.mentorRef) {
            return (
              <MentorContainer>
                <h1>Mentor page</h1>
                <h2>Name: {this.state.mname}</h2>
                <h2>Major: {this.state.mmajor}</h2>
                <h2>Graduation Year: {this.state.myear}</h2>
                <h2>Bio: {this.state.mbio}</h2>
                <h2>
                  Interests: {this.state.minterest1}, {this.state.minterest2},{" "}
                  {this.state.minterest3}
                </h2>
                <Button>Chat With Mentor</Button>
              </MentorContainer>
            );
          } else if (
            this.props.user &&
            this.state.mentorRef &&
            !this.state.mentorPic
          ) {
            return <ChatContainer>Loading...</ChatContainer>;
          } else if (this.props.user && !this.state.mentorRef) {
            return (
              <Container>
                <ChatContainer>
                  You haven't signed up for a mentor! Click the button below to
                  be matched with a current UCLA student!
                </ChatContainer>
                <Button onClick = {this.match}>Match</Button>
              </Container>
            );
          }
        })()}
      </div>
    );
  }
}
