import React from "react";
import {
  upvotePost,
  getPost,
  removeVote,
  downvotePost,
  timeSince
} from "../database/postDatabase.js";
import styled from "styled-components";
import { css } from "emotion";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
  FaComments
} from "react-icons/fa";
import { getUser } from "../database/userDatabase";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fade } from "react-reveal";

const PostBackground = styled("div")`
  background-color: #fff7cc;
  width: 100%;
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

const Votes = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
  padding-right: 25px;
`;

const Profile = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  padding-left: 5px;
  padding-right: 5px;
`;

const Name = styled("div")`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 18px;
  padding-left: 5px;
`;

const ProfileContainer = styled("div")`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
`;

const QuestionStyle = styled("div")`
  font-size: 28px;
  padding-bottom: 10px;
`;

const DescriptionStyle = styled("div")`
  font-size: 16px;
  padding-bottom: 15px;
  max-width: 800px;
`;

const CommentContainer = styled("div")`
  display: flex;
  align-items: center;
  font-size: 18px;
  max-width: 800px;
`;
const QuestionContainer = styled("div")`
  display: flex;
  flex-direction: column;
`;

const ModalStyle = styled(Modal)`
  font-family: "Balsamiq Sans";
  margin-top: 50px;
  margin-bottom: 50px;
  max-height: 100%;
  overflow-y: scroll;
`;

class OpenProfileModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      dataLoaded: false,
      name: null,
      pic: null,
      major: null,
      year: null,
      bio: null,
      karma: null,
      interests: null
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  handleClose(e) {
    this.setState({ show: false });
  }

  handleShow(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ show: true });
  }

  loadData() {
    getUser(this.props.userID, user => {
      this.setState({
        dataLoaded: true,
        name: user.name,
        pic: user.avatar,
        major: user.major,
        year: user.year,
        bio: user.bio,
        karma: user.karma,
        interest1: user.interest1,
        interest2: user.interest2,
        interest3: user.interest3
      });
      this.forceUpdate();
    });
  }

  render() {
    if (!this.state.dataLoaded) {
      this.loadData();
    }
    return (
      <>
        <Profile>
          <img
            src={this.props.authorPic}
            alt="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxfRU55yMsbgdDn_rpmnqf60WKvo157flOJxTdO3NkqG0guXn4&usqp=CAU"
            className={css`
              border-radius: 50%;
              height: 40px;
              width: 40px;
            `}
            onClick={this.handleShow}
          />
        </Profile>

        <ModalStyle show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              {this.state.dataLoaded
                ? this.state.name + "'s Profile"
                : "Loading..."}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PostBackground>
              <QuestionContainer>
                <ProfileContainer>
                  <Profile>
                    <img
                      src={this.props.authorPic}
                      alt="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxfRU55yMsbgdDn_rpmnqf60WKvo157flOJxTdO3NkqG0guXn4&usqp=CAU"
                      className={css`
                        border-radius: 50%;
                        height: 80px;
                        width: 80px;
                      `}
                    />
                  </Profile>
                  <Name>{this.state.name}</Name>
                </ProfileContainer>
                <DescriptionStyle>
                  Major:{" "}
                  {this.state.dataLoaded ? this.state.major : "loading..."}
                </DescriptionStyle>
                <DescriptionStyle>
                  Class of{" "}
                  {this.state.dataLoaded ? this.state.year : "loading..."}
                </DescriptionStyle>
                <DescriptionStyle>
                  Karma:{" "}
                  {this.state.dataLoaded ? this.state.karma : "loading..."}
                </DescriptionStyle>
              </QuestionContainer>
            </PostBackground>
          </Modal.Body>
          <Modal.Footer />
        </ModalStyle>
      </>
    );
  }
}

export default class PostCard extends React.Component {
  _disabled = false;
  constructor(props) {
    super(props);
    this.state = {
      postID: this.props.postID,
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

  componentDidUpdate() {
    if (!this.state.loaded) this.loadUser();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.postID !== prevState.postID) {
      return {
        postID: nextProps.postID,
        upvotes: nextProps.upvotes,
        loaded: false
      };
    } else return null;
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

  handleUpvoteWithDownvote(e) {
    e.stopPropagation();
    if (!this.props.user) {
      alert("You must be logged in to upvote or downvote!");
      return;
    }
    if (!this._disabled) {
      this._disabled = true;
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

  handleDownvoteWithUpvote(e) {
    e.stopPropagation();
    if (!this.props.user) {
      alert("You must be logged in to upvote or downvote!");
      return;
    }
    if (!this._disabled) {
      this._disabled = true;
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
        }
      });
    }
  }

  handleUpvote(e) {
    e.stopPropagation();
    if (!this.props.user) {
      alert("You must be logged in to upvote or downvote!");
      return;
    }
    if (!this._disabled) {
      this._disabled = true;
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
            }
          });
        }
      });
    }
  }

  handleDownvote(e) {
    e.stopPropagation();
    if (!this.props.user) {
      alert("You must be logged in to upvote or downvote!");
      return;
    }
    if (!this._disabled) {
      this._disabled = true;
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
            }
          });
        }
      });
    }
  }

  render() {
    return (
      <Fade
        duration={500}
        appear
        spy={this.state.postID}
        key={this.state.postID}
      >
        <PostBackground>
          <Votes>
            {this.state.upvoteIcon}
            {this.state.upvotes}
            {this.state.downvoteIcon}
          </Votes>
          <QuestionContainer>
            <ProfileContainer>
              <Profile>
                <OpenProfileModal
                  userID={this.props.authorID}
                  authorPic={this.props.authorPic}
                />
              </Profile>
              <Name>
                {this.props.authorName} posted {timeSince(this.props.timestamp)}
              </Name>
            </ProfileContainer>
            <QuestionStyle>{this.props.title}</QuestionStyle>
            <DescriptionStyle>{this.props.body}</DescriptionStyle>
            <CommentContainer>
              <FaComments
                className={css`
                  height: 30px;
                  width: 30px;
                  padding-right: 10px;
                `}
              />
              {this.props.replies.length} Comment
              {this.props.replies.length === 1 ? "" : "s"}
            </CommentContainer>
          </QuestionContainer>
        </PostBackground>
      </Fade>
    );
  }
}
