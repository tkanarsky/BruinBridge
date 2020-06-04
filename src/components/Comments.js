import React from "react";
import { createComment, getComments } from "../database/commentDatabase.js";
import CommentCard from "./CommentCard";
import { FlexBox } from "../pages/ForumPage";
import { Button } from "../pages/LandingPage"
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
            <FlexBox>
              <label
                style={{
                  paddingTop: "10px",
                  paddingRight: "10px"
                }}
              >
                <span>
                  Add a comment...
                </span>
              </label>
            </FlexBox>
            <FlexBox>
              <textarea
                value={this.state.comment}
                onChange={this.handleComment}
                style={{
                  lineHeight: "1.5em",
                  resize: "none",
                  overflow: "scroll",
                  height: "80px",
                  fontSize: "16px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  flexGrow: 5
                }}
              />
            </FlexBox>
            <Button onClick={this.handleSubmit}>
							Submit
            </Button>
          </form>
        </Fade>
        {this.renderComments(this.state.comments)}
      </>
    );
  }
}
