import React from "react";
import { updateUser, database } from "../firebase";
import styled from "styled-components";
import { css } from "emotion";
import { TiThumbsUp, TiThumbsDown } from "react-icons/ti";
import InfiniteScroll from "react-infinite-scroll-component";

const PostBackground = styled("div")`
  background-color: #fff7cc;
  width: 98%;
  height: 140px;
  display: flex;
  justify-content: left;
  padding-left: 20px;
  align-items: center;
  margin-top: 20px;
`;

const Votes = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Profile = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const Name = styled("div")`
  font-weight: 700;
  padding-top: 10px;
  font-size: 14px;
`;

const QuestionStyle = styled("div")`
  font-size: 24px;
  padding-bottom: 10px;
`;

const DescriptionStyle = styled("div")`
  font-size: 16px;
`;
const QuestionContainer = styled("div")`
  display: flex;
  flex-direction: column;
`;

class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //   const {upvotes, downvotes, profilepic, name, question, description} = this.props;
    return (
      <PostBackground>
        <Votes>
          <TiThumbsUp size={40}></TiThumbsUp>
          upvotes prop here
          <TiThumbsDown size={40}></TiThumbsDown>
          downvotes prop here
        </Votes>
        <Profile>
          <img
            src="https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            className={css`
              border-radius: 50%;
              height: 65px;
              width: 65px;
            `}
          />
          <Name>name prop here</Name>
        </Profile>
        <QuestionContainer>
          <QuestionStyle>put question prop here</QuestionStyle>
          <DescriptionStyle>put description here</DescriptionStyle>
        </QuestionContainer>
      </PostBackground>
    );
  }
}

export default class ForumPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
  }

  //   componentDidMount() {
  //     if (!posts) {
  //       this.loadPosts();
  //     }
  //   }

  loadPosts() {
    // call firebase function to get posts data
    //this.setState({posts: })
  }

  render() {
    // const { posts } = this.state;
    // if (!post) { this.loadPosts()}
    // return posts.map((item, index) => {

    // });

    // pass in props from each post object to each post component
    // remove this:
    return (
      <div>
        <Post></Post>
        <Post></Post>
        <Post></Post>
      </div>
    );
  }
}
