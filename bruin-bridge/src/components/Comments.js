import React from "react";
import { createComment, getComments } from "../firebase";
import CommentCard from "./CommentCard";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      comments: [],
      loaded: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleComment = this.handleComment.bind(this);
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
    } else alert("You must be logged in to submit a comment!");
    event.preventDefault();
  }

  handleComment(event) {
    this.setState({ comment: event.target.value });
  }

  renderComments(allComments) {
    return allComments.map((comment, i) => {
      return (
        <CommentCard
          key={i}
          authorPic={comment.author_avatar}
          authorName={comment.author_name}
          text={comment.body}
        ></CommentCard>
      );
    });
  }

  render() {
    if (!this.state.loaded) {
      getComments(this.props.postID, allComments => {
        this.setState({ comments: allComments, loaded: true });
      });
    }
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
