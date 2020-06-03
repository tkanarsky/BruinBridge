import React from "react";
import styled from "styled-components";
import { getUser } from "../database/userDatabase";
import { matching } from "../database/userDatabase";
import { css } from "emotion";
import { FiArrowUpCircle } from "react-icons/fi";
import {
  sendMessage,
  getMessages,
  subscribeToChat
} from "../database/chatDatabase";

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
  height: 90%;
  background-color: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 20px 50px 20px 50px;
  flex-direction: column;
  justify-content: flex-end;
  overflow: scroll;
`;

const ConversationContainer = styled("div")`
  height: 100%;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  overflow: scroll;
`;

const ChatBubble = styled("div")`
  height: auto;
  width: auto;
  padding: 15px;
  background-color: #fff7cc;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const MyChatBubble = styled(ChatBubble)`
  align-self: flex-end;
  background-color: #0e92fb;
  color: white;
`;

const OtherChatBubble = styled(ChatBubble)`
  align-self: flex-start;
  background-color: #e5e5e5;
  color: black;
`;

const Container = styled("div")`
  position: relative;
  top: 25px;
  display: flex;
  justify-content: center;
  height: 80%;
  align-items: stretch;
`;

const TypeBar = styled.input`
  width: 100%;
  background-color: #fff7cc;
  font-size: 12px;
  border: 1px solid black;
`;

const Type = styled("div")`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5%;
`;
export default class MentorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mentorID: null,
      menteeID: null,
      mStatus: null,
      mentor_id: null,
      mentee_id: null,
      mPic: null,
      mname: null,
      mmajor: null,
      myear: null,
      mbio: null,
      mkarma: null,
      minterest1: null,
      minterest2: null,
      minterest3: null,
      dataLoaded: false,
      // chat states:
      curMessage: "",
      allMessages: null
    };
    this.loadData = this.loadData.bind(this);
    this.loadMessages = this.loadMessages.bind(this);
    this.match = this.match.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.setMentorMenteeIDs = this.setMentorMenteeIDs.bind(this);
  }

  match() {
    const { user } = this.props;
    getUser(user.uid, userData => {
      if (!userData.interest1 && !userData.interest2 && !userData.interest3) {
        alert("Error: Must fill out interests");
        return;
      }
      if (!userData.major) {
        alert("Error: Must fill out major");
        return;
      }
      if (userData.is_mentor) {
        alert("Error: Must be mentee");
        return;
      }
      matching(user.uid);
      this.loadData();
    });
  }

  componentDidMount() {}

  loadData() {
    const { user } = this.props;
    if (user) {
      getUser(user.uid, userData => {
        let partner = userData.partner;
        if (partner) {
          getUser(partner, userData => {
            this.setState(
              {
                mStatus: userData.is_mentor,
                mRef: partner,
                mPic: userData.avatar,
                mname: userData.name,
                mmajor: userData.major,
                myear: userData.year,
                mbio: userData.bio,
                mkarma: userData.karma,
                minterest1: userData.interest1,
                minterest2: userData.interest2,
                minterest3: userData.interest3,
                dataLoaded: true
              },
              () => this.setMentorMenteeIDs(this.state.mStatus)
            );
          });
        }
      });
    }
  }

  loadMessages() {
    getMessages(
      this.props.user,
      this.state.mentorID,
      this.state.menteeID,
      messages => {
        this.setState({ allMessages: messages.reverse() });
      }
    );
  }

  displayMessages() {
    if (!this.state.allMessages) return;
    else {
      return this.state.allMessages.map((msg, i) => {
        if (msg.sender === this.props.user.uid) {
          return <MyChatBubble key={i}>{msg.text}</MyChatBubble>;
        } else {
          return <OtherChatBubble key={i}>{msg.text}</OtherChatBubble>;
        }
      });
    }
  }

  setMentorMenteeIDs(partnerIsMentor) {
    if (!partnerIsMentor) {
      this.setState(
        {
          mentorID: this.props.user.uid,
          menteeID: this.state.mRef
        },
        () => this.loadMessages()
      );
    } else {
      this.setState(
        {
          mentorID: this.state.mRef,
          menteeID: this.props.user.uid
        },
        () => this.loadMessages()
      );
    }
  }

  handleSubmit() {
    if (this.state.curMessage.length === 0) {
      alert("You cannot send an empty message!");
      return;
    } else {
      sendMessage(
        this.props.user,
        this.state.mentorID,
        this.state.menteeID,
        this.state.curMessage
      );
    }
    this.setState({ curMessage: "" }, () => this.loadMessages());
  }

  handleTyping(event) {
    this.setState({ curMessage: event.target.value });
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
          if (this.props.user && this.state.mRef && this.state.mStatus) {
            return (
              <Container>
                <MentorContainer>
                  <h1>My Mentor:</h1>
                  <img
                    src={this.state.mPic}
                    className={css`
                      border-radius: 50%;
                      height: 200px;
                      width: 200px;
                    `}
                  />
                  <h2>Name: {this.state.mname}</h2>
                  <h2>Major: {this.state.mmajor}</h2>
                  <h2>Graduation Year: {this.state.myear}</h2>
                  <h2>Bio: {this.state.mbio}</h2>
                  <h2>
                    Interests: {this.state.minterest1}, {this.state.minterest2},{" "}
                    {this.state.minterest3}
                  </h2>
                </MentorContainer>
                <ChatContainer>
                  <ConversationContainer>
                    {this.displayMessages()}
                  </ConversationContainer>
                  <Type>
                    <TypeBar
                      placeholder="Type a message..."
                      value={this.state.curMessage}
                      onChange={this.handleTyping}
                      onKeyPress={event => {
                        if (event.key === "Enter") {
                          this.handleSubmit();
                        }
                      }}
                    ></TypeBar>
                    <FiArrowUpCircle onClick={this.handleSubmit} size={30} />
                  </Type>
                </ChatContainer>
              </Container>
            );
          } else if (
            this.props.user &&
            this.state.mRef &&
            !this.state.mStatus
          ) {
            return (
              <Container>
                <MentorContainer>
                  <h1>My Mentee:</h1>
                  <img
                    src={this.state.mPic}
                    className={css`
                      border-radius: 50%;
                      height: 200px;
                      width: 200px;
                    `}
                  />
                  <h2>Name: {this.state.mname}</h2>
                  <h2>Major: {this.state.mmajor}</h2>
                  <h2>Graduation Year: {this.state.myear}</h2>
                  <h2>Bio: {this.state.mbio}</h2>
                  <h2>
                    Interests: {this.state.minterest1}, {this.state.minterest2},{" "}
                    {this.state.minterest3}
                  </h2>
                </MentorContainer>
                <ChatContainer>
                  <ConversationContainer>
                    {this.displayMessages()}
                  </ConversationContainer>
                  <Type>
                    <TypeBar
                      placeholder="Type a message..."
                      value={this.state.curMessage}
                      onChange={this.handleTyping}
                      onKeyPress={event => {
                        if (event.key === "Enter") {
                          this.handleSubmit();
                        }
                      }}
                    ></TypeBar>
                    <FiArrowUpCircle onClick={this.handleSubmit} size={30} />
                  </Type>
                </ChatContainer>
              </Container>
            );
          } else if (
            this.props.user &&
            this.state.mentor_id &&
            !this.state.mPic
          ) {
            return <ChatContainer>Loading...</ChatContainer>;
          } else if (
            this.props.user &&
            !this.state.mRef &&
            !this.state.mStatus
          ) {
            return (
              <Container>
                You haven't signed up for a mentor! Click the button below to be
                matched with a current UCLA student!
                <Button onClick={this.match}>Find a Mentor</Button>
              </Container>
            );
          } else if (
            this.props.user &&
            !this.state.mRef &&
            this.state.mStatus
          ) {
            return (
              <Container>
                <ChatContainer>Wait To be matched with a mentee!</ChatContainer>
              </Container>
            );
          }
        })()}
      </div>
    );
  }
}
