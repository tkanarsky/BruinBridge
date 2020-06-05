import React from "react";
import styled from "styled-components";
import { getUser } from "../database/userDatabase";
import { matching } from "../database/userDatabase";
import { css } from "emotion";
import { FiArrowUpCircle } from "react-icons/fi";
import {
  sendMessage,
  subscribeToChat,
  unsubscribeFromChat
} from "../database/chatDatabase";
import { mediaQueries } from "../constants/media";
const { mobile } = mediaQueries;

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
  margin-right: 30px;
  padding: 25px;

  ${mobile} {
    flex-direction: row;
    width: 60%;
    height: 10%;
    background-color: #ade1ff;
  }
`;

const ProfileInfo = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  ${mobile} {
    display: none;
  }
`;

const Text = styled("div")`
  color: black;
  font-size: 20px;
  display: flex;
  padding-bottom: 10px;
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
  font-family: "Open Sans", sans-serif;
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
  ${mobile} {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;

const NoChatContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 30px;
  flex-direction: column;
  padding: 50px;
  height: 25%;
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
      mRef: null,
      mStatus: null,
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
    this.onNewMessage = this.onNewMessage.bind(this);
    this.match = this.match.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
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
      matching(user.uid, () => {
        this.loadData();
        console.log("done with matching!");
      });
    });
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    unsubscribeFromChat(this.props.user, this.state.mentorID, 
      this.state.menteeID);
  }

  componentDidUpdate() {
    if (!this.state.dataLoaded) {
      console.log("data loading...");
      this.loadData();
    }
  }

  loadData() {
    console.log("load");
    const { user } = this.props;
    if (user) {
      console.log("user exists...");
      getUser(user.uid, userData => {
        console.log("loaded myself");
        let partner = userData.partner;
        if (partner) {
          getUser(partner, userData => {
            console.log("loaded partner");
            this.setState(
              {
                mStatus: userData.is_mentor,
                mRef: partner,
                mentorID: userData.is_mentor ? partner : user.uid,
                menteeID: userData.is_mentor ? user.uid : partner,
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
              () => {
                console.log("Chat subscribed!");
                subscribeToChat(
                  user,
                  this.state.mentorID,
                  this.state.menteeID,
                  this.onNewMessage
                );
              }
            );
            console.log("State set!");
            this.forceUpdate();
          });
        } else {
          this.setState({
            dataLoaded: true,
            mStatus: userData.is_mentor,
            mRef: null
          });
          this.forceUpdate();
        }
      });
    }
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

  onNewMessage(newMessage) {
    let messageList = this.state.allMessages;
    if (!messageList) messageList = [];
    console.log(newMessage);
    messageList.unshift(newMessage);
    this.setState({ allMessages: messageList });
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
    this.setState({ curMessage: "" });
  }

  handleTyping(event) {
    this.setState({ curMessage: event.target.value });
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
        {(() => {
          if (this.props.user && this.state.mRef) {
            return (
              <Container>
                <MentorContainer>
                  {this.state.mStatus && <h1>My Mentor</h1>}
                  {!this.state.mStatus && <h1>My Mentee</h1>}
                  <img
                    src={this.state.mPic}
                    alt="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxfRU55yMsbgdDn_rpmnqf60WKvo157flOJxTdO3NkqG0guXn4&usqp=CAU"
                    className={css`
                      border-radius: 50%;
                      height: 200px;
                      width: 200px;
                      ${mobile} {
                        height: 75px;
                        width: 75px;
                      }
                    `}
                  />

                  <h1>{this.state.mname}</h1>
                  <ProfileInfo>
                    <Text>
                      <strong>{this.state.mmajor} Major</strong>
                    </Text>
                    <Text>
                      <strong>Class of {this.state.myear}</strong>
                    </Text>
                    <Text style={{ fontFamily: "Open Sans" }}>
                      {this.state.mbio}
                    </Text>
                    <Text>
                      <strong>Interests:</strong>
                    </Text>
                    <Text style={{ fontFamily: "Open Sans" }}>
                      {this.state.minterest1}, {this.state.minterest2},{" "}
                      {this.state.minterest3}
                    </Text>
                  </ProfileInfo>
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
          } else if (this.props.user && !this.state.dataLoaded) {
            return <Container>Loading...</Container>;
          } else if (
            this.props.user &&
            !this.state.mStatus &&
            this.state.dataLoaded
          ) {
            return (
              <Container>
                <NoChatContainer>
                  You haven't signed up for a mentor! Click the button below to
                  be matched with a current UCLA student!
                  <Button onClick={this.match}>Find a Mentor</Button>
                </NoChatContainer>
              </Container>
            );
          } else if (
            this.props.user &&
            this.state.dataLoaded &&
            this.state.mStatus
          ) {
            return <Container>Wait to be matched with a mentee!</Container>;
          }
        })()}
      </div>
    );
  }
}
