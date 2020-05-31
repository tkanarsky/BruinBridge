import React from "react";
import { createComment, getComments } from "../database/commentDatabase.js";
import { css } from "emotion";
import styled from "styled-components";

const CommentsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  width: 90%;
  border-radius: 5px;
  background-color: #e5e5e5;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 25px;
  height: 100%;
  box-shadow: 3px 3px 2px 2px #d8d8d8;
`;

const Profile = styled("div")`
  display: flex;
  flex-direction: column;
  width: 7%;
  align-items: center;
`;

const Name = styled("div")`
  font-weight: 700;
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  padding-top: 3px;
`;

const CommentBody = styled("div")`
  width: 90%;
  font-size: 14px;
  padding-right: 25px;
  padding-bottom: 10px;
  padding-left: 25px;
`;

const All = styled("div")`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
`;

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      comments: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.postID !== this.props.postID) {
      getComments(this.props.postID, allComments => {
        this.setState({ comment: "", comments: allComments });
      });
    }
  }

  handleSubmit(event) {
    if (this.state.comment === "") {
      alert("Please enter a comment!");
      return;
    }
    if (this.props.user) {
      createComment(
        this.props.user,
        this.props.postID,
        this.state.comment,
        commentId => {}
      );
      getComments(this.props.postID, allComments => {
        this.setState({ comment: "", comments: allComments });
      });
    } else alert("You must be logged in to submit a comment!");
    event.preventDefault();
  }

  handleComment(event) {
    this.setState({ comment: event.target.value });
  }

  componentDidMount() {
    getComments(this.props.postID, allComments => {
      this.setState({ comments: allComments });
    });
  }

  renderComments(allComments) {
    return allComments.map((comment, i) => {
      return (
        <All key={i}>
          <CommentsContainer>
            <Profile>
              <img
                src={comment.author_avatar}
                alt="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxfRU55yMsbgdDn_rpmnqf60WKvo157flOJxTdO3NkqG0guXn4&usqp=CAU"
                className={css`
                  border-radius: 50%;
                  height: 45px;
                  width: 45px;
                `}
              />
              <Name>{comment.author_name}</Name>
            </Profile>
            <CommentBody>{comment.body}</CommentBody>
          </CommentsContainer>
        </All>
      );
    });
  }
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            Add a comment &#160;
            <input
              type="text"
              value={this.state.comment}
              onChange={this.handleComment}
              style={{
                lineHeight: "2em",
                fontSize: "16px",
                paddingLeft: "5x",
                width: "80%"
              }}
            ></input>
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
        {this.renderComments(this.state.comments)}
      </>
    );
  }
}
