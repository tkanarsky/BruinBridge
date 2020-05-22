import React from "react";
import styled from "styled-components";
import { createPost } from "../firebase.js"

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

const PostBackground = styled("div")`
  background-color: #fffecf;
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

const Post = (props) => (
  <PostBackground>
    <div>
      <h3>Title</h3>
      <p>Description</p>
      <p>42 Upvotes</p>
      <p>12 Downvotes</p>
    </div>
  </PostBackground>
)

const PostContainer = styled("div")`
  background-color: white;
  border-radius: 25px;
  width: 95%;
  height: 80%;
  margin-top: 25px;
  padding: 20px;
`;

const SubmitButton = styled("button")`
  display: flex;
  background-color: #ffe457;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100px;
  height: 50px;
  border-radius: 50px;
  font-size: 16px;
  font-family: "Open Sans";
  font-weight: bold;
  justify-content: center;
  align-items: center;
  margin: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const SubmitQuestion = styled("div")`
  background-color: white;
  border-radius: 20px;
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
      postInput: '',
      posts: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({postInput: event.target.value});
  }

  handleSubmit(event) {
    if (this.props.user) {
      createPost(this.props.user, "Forum Post", this.state.postInput, (postId) => {});
      console.log("Created post!");
    }
    else alert('You must be logged in to submit a post!');
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
                Post:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit"/>
              </form>
              <SubmitButton>Submit</SubmitButton>
            </SubmitQuestion>
            <PostContainer>
              <Post />
              <h1>{this.state.postInput}</h1>
            </PostContainer>
          </QuestionsContainer>
        </AllContainer>
      </div>
    );
  }
}
