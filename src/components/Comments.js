import React from "react";
import { createComment, getComments } from "../database/commentDatabase.js";
import CommentCard from "./CommentCard";
import { Fade } from "react-reveal";

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
        <CommentCard
          key={i}
          authorPic={comment.author_avatar}
          authorName={comment.author_name}
          text={comment.body}
          timestamp={comment.timestamp}
        ></CommentCard>
      );
    });
  }
  render() {
    return (
      <>
        <Fade down distance={"15px"} duration={500}>
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
          </Fade>
          {this.renderComments(this.state.comments)}
      </>
    );
  }
}
