import React from "react";
import styled from "styled-components";
import { createPost } from "../firebase.js";
import ForumPost from "../components/ForumPost";

const SchoolContainer = styled("div")`
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

const UCLAimg = styled("div")`
  background-image: url("https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_91c6277d-4277-42e0-b87d-aedcf49e070c-prv.jpg");
  width: 250px;
  height: 250px;
  min-width: 100px;
  min-height: 100px;
  border-radius: 50%;
  background-position: center;
  margin-bottom: 30px;
`;

const UCLAname = styled("div")`
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/University_of_California%2C_Los_Angeles_logo.svg/1200px-University_of_California%2C_Los_Angeles_logo.svg.png");
  min-width: 175px;
  min-height: 75px;
  background-size: contain;
  background-repeat: no-repeat;
`;

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

const Fact = styled("div")`
  font-family: "Open Sans";
  font-size: 18px;
  white-space: nowrap;
`;
const PostContainer = styled("div")`
  background-color: white;
  border-radius: 25px;
  width: 95%;
  height: 80%;
  margin-top: 25px;
  padding: 20px;
`;

const SubmitQuestion = styled("div")`
  background-color: white;
  border-radius: 20px;
  width: 97%;
  height: 50px;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const QuestionsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  width: 90%;
  padding-right: 20px;
`;

const AllContainer = styled("div")`
  display: flex;
  flex-direction: row;
  padding-top: 25px;
  height: 100%;
`;

export default class ForumPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postInput: "",
      title: "",
      posts: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
  }

  handleChange(event) {
    this.setState({ postInput: event.target.value });
  }

  handleTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.title === "") {
      alert("Must have post title");
      return;
    }
    if (this.state.postInput === "") {
      alert("Must not submit blank question");
      return;
    }
    if (this.props.user) {
      createPost(this.props.user, "Forum Post", this.state.postInput);
      console.log("Created post!");
      alert(this.state.title + " Post: " + this.state.postInput); //testing purposes can delete later
      this.setState({ title: "", postInput: "" });
    } else alert("You must be logged in to submit a post!");
    event.preventDefault();
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
        <AllContainer>
          <SchoolContainer>
            <UCLAimg></UCLAimg>
            <UCLAname></UCLAname>
            <Button>Find a Mentor</Button>
            <Fact>#1 Public University!</Fact>
            <Fact>#1 College Dining Hall Food!</Fact>
            <Fact>yay woooooooo</Fact>
            <Fact>more info here</Fact>
          </SchoolContainer>
          <QuestionsContainer>
            <SubmitQuestion>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Title:
                  <input
                    type="text"
                    value
                    value={this.state.title}
                    onChange={this.handleTitle}
                    style={{
                      lineHeight: "2em",
                      fontSize: "16px",
                      paddingLeft: "5x",
                      width: "20%"
                    }}
                  />
                </label>
                <label style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                  Description:
                  <input
                    type="text"
                    value={this.state.postInput}
                    onChange={this.handleChange}
                    style={{
                      lineHeight: "2em",
                      fontSize: "16px",
                      paddingLeft: "5x",
                      width: "50%"
                    }}
                  />
                </label>
                <input
                  type="submit"
                  value="Submit"
                  style={{
                    backgroundColor: "#ffe457",
                    fontFamily: "Open Sans",
                    fontSize: "15px",
                    borderRadius: "20px",
                    width: "100px",
                    height: "50px"
                  }}
                />
              </form>
            </SubmitQuestion>
            <PostContainer>
              <ForumPost></ForumPost>
            </PostContainer>
          </QuestionsContainer>
        </AllContainer>
      </div>
    );
  }
}
