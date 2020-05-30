import React from "react";
import { upvotePost, getPost, removeVote, downvotePost } from "../database/postDatabase.js";
import styled from "styled-components";
import { css } from "emotion";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown
} from "react-icons/fa";

const PostBackground = styled("div")`
  background-color: #fff7cc;
  width: 98%;
  height: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: left;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  margin-top: 20px;
  border-radius: 15px;
`;

const Profile = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
  padding-left: 20px;
  padding-right: 20px;
  width: 15%;
`;
const Votes = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
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
  max-width: 800px;
`;
const QuestionContainer = styled("div")`
  display: flex;
  flex-direction: column;
`;

export default class PostCard extends React.Component {
  _disabled = false;
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      upvotes: this.props.upvotes,
      upvoteIcon: (
        <FaRegThumbsUp
          size={30}
          onClick={this.handleUpvote.bind(this)}
        ></FaRegThumbsUp>
      ),
      downvoteIcon: (
        <FaRegThumbsDown
          size={30}
          onClick={this.handleDownvote.bind(this)}
        ></FaRegThumbsDown>
      ),
      loaded: false
    };

    this.loadUser = this.loadUser.bind(this);
  }

  componentDidMount() {
    if (!this.state.loaded) this.loadUser();
  }

  loadUser() {
    if (!this.state.loaded && this.props.user) {
      let u = this.props.user;
      let uid = u.uid;
      let postId = this.props.postID;
      this.setState({ userID: uid, loaded: true });
      getPost(postId, postData => {
        if (postData.upvoting_users.includes(uid)) {
          this.setState({
            upvoteIcon: (
              <FaThumbsUp
                size={30}
                onClick={this.handleUpvote.bind(this)}
              ></FaThumbsUp>
            ),
            downvoteIcon: (
              <FaRegThumbsDown
                size={30}
                onClick={this.handleDownvoteWithUpvote.bind(this)}
              ></FaRegThumbsDown>
            )
          });
          return;
        } else if (postData.downvoting_users.includes(uid)) {
          this.setState({
            upvoteIcon: (
              <FaRegThumbsUp
                size={30}
                onClick={this.handleUpvoteWithDownvote.bind(this)}
              ></FaRegThumbsUp>
            ),
            downvoteIcon: (
              <FaThumbsDown
                size={30}
                onClick={this.handleDownvote.bind(this)}
              ></FaThumbsDown>
            )
          });
        }
      });
    } else if (!this.state.loaded && !this.state.user) {
      this.setState({ loaded: true });
    }
  }

  handleUpvoteWithDownvote() {
    if (!this.props.user) {
      alert("You must be logged in to upvote or downvote!");
      return;
    }
    if (!this._disabled) {
      this._disabled = true;
      console.log("processing upvote with downvote");
      upvotePost(this.state.userID, this.props.postID, successCallback => {
        if (this.state.loaded && successCallback) {
          this.setState(
            {
              upvotes: this.state.upvotes + 2,
              upvoteIcon: (
                <FaThumbsUp
                  size={30}
                  onClick={this.handleUpvote.bind(this)}
                ></FaThumbsUp>
              ),
              downvoteIcon: (
                <FaRegThumbsDown
                  size={30}
                  onClick={this.handleDownvoteWithUpvote.bind(this)}
                ></FaRegThumbsDown>
              )
            },
            () => {
              this._disabled = false;
            }
          );
        }
      });
    }
  }

  handleDownvoteWithUpvote() {
    if (!this.props.user) {
      alert("You must be logged in to upvote or downvote!");
      return;
    }
    if (!this._disabled) {
      this._disabled = true;
      console.log("processing downvote with upvote");
      downvotePost(this.state.userID, this.props.postID, successCallback => {
        if (this.state.loaded && successCallback) {
          this.setState(
            {
              upvotes: this.state.upvotes - 2,
              upvoteIcon: (
                <FaRegThumbsUp
                  size={30}
                  onClick={this.handleUpvoteWithDownvote.bind(this)}
                ></FaRegThumbsUp>
              ),
              downvoteIcon: (
                <FaThumbsDown
                  size={30}
                  onClick={this.handleDownvote.bind(this)}
                ></FaThumbsDown>
              )
            },
            () => {
              this._disabled = false;
            }
          );
          console.log(this.state.upvotes);
          console.log("downvoted with upvote");
        }
      });
    }
  }

  handleUpvote() {
    if (!this.props.user) {
      alert("You must be logged in to upvote or downvote!");
      return;
    }
    if (!this._disabled) {
      this._disabled = true;
      console.log("processing upvote");
      upvotePost(this.state.userID, this.props.postID, successCallback => {
        if (this.state.loaded && successCallback) {
          this.setState(
            {
              upvotes: this.state.upvotes + 1,
              upvoteIcon: (
                <FaThumbsUp
                  size={30}
                  onClick={this.handleUpvote.bind(this)}
                ></FaThumbsUp>
              ),
              downvoteIcon: (
                <FaRegThumbsDown
                  size={30}
                  onClick={this.handleDownvoteWithUpvote.bind(this)}
                ></FaRegThumbsDown>
              )
            },
            () => {
              this._disabled = false;
            }
          );
          console.log(this.state.upvotes);
          console.log("upvoted");
        } else {
          removeVote(this.state.userID, this.props.postID, successCallback => {
            if (this.state.loaded && successCallback) {
              this.setState(
                {
                  upvotes: this.state.upvotes - 1,
                  upvoteIcon: (
                    <FaRegThumbsUp
                      size={30}
                      onClick={this.handleUpvote.bind(this)}
                    ></FaRegThumbsUp>
                  ),
                  downvoteIcon: (
                    <FaRegThumbsDown
                      size={30}
                      onClick={this.handleDownvote.bind(this)}
                    ></FaRegThumbsDown>
                  )
                },
                () => {
                  this._disabled = false;
                }
              );
              console.log(this.state.upvotes);
              console.log("removed vote");
            }
          });
        }
      });
    }
  }

  handleDownvote() {
    if (!this.props.user) {
      alert("You must be logged in to upvote or downvote!");
      return;
    }
    if (!this._disabled) {
      this._disabled = true;
      console.log("processing downvote");
      downvotePost(this.state.userID, this.props.postID, successCallback => {
        if (this.state.loaded && successCallback) {
          this.setState(
            {
              upvotes: this.state.upvotes - 1,
              upvoteIcon: (
                <FaRegThumbsUp
                  size={30}
                  onClick={this.handleUpvoteWithDownvote.bind(this)}
                ></FaRegThumbsUp>
              ),
              downvoteIcon: (
                <FaThumbsDown
                  size={30}
                  onClick={this.handleDownvote.bind(this)}
                ></FaThumbsDown>
              )
            },
            () => {
              this._disabled = false;
            }
          );
        } else {
          removeVote(this.state.userID, this.props.postID, successCallback => {
            if (this.state.loaded && successCallback) {
              this.setState(
                {
                  upvotes: this.state.upvotes + 1,
                  upvoteIcon: (
                    <FaRegThumbsUp
                      size={30}
                      onClick={this.handleUpvote.bind(this)}
                    ></FaRegThumbsUp>
                  ),
                  downvoteIcon: (
                    <FaRegThumbsDown
                      size={30}
                      onClick={this.handleDownvote.bind(this)}
                    ></FaRegThumbsDown>
                  )
                },
                () => {
                  this._disabled = false;
                }
              );
              console.log(this.state.votes);
              console.log("removed vote");
            }
          });
        }
      });
    }
  }

  render() {
    return (
      <PostBackground>
        <Votes>
          {this.state.upvoteIcon}
          {this.state.upvotes}
          {this.state.downvoteIcon}
        </Votes>
        <Profile>
          <img
            src={this.props.authorPic}
            alt="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxfRU55yMsbgdDn_rpmnqf60WKvo157flOJxTdO3NkqG0guXn4&usqp=CAU"
            className={css`
              border-radius: 50%;
              height: 65px;
              width: 65px;
            `}
          />
          <Name>{this.props.authorName}</Name>
        </Profile>
        <QuestionContainer>
          <QuestionStyle>{this.props.title}</QuestionStyle>
          <DescriptionStyle>{this.props.body}</DescriptionStyle>
        </QuestionContainer>
      </PostBackground>
    );
  }
}
