import React from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Comments from "./Comments";
import PostCard from "./PostCard";

const ModalStyle = styled(Modal)`
  font-family: "Balsamiq Sans";
  margin-top: 50px;
  margin-bottom: 50px;
  max-height: 100%;
  overflow-y: scroll;
`;

class OpenPostModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showModal: false
    };

    this.postModalShow = this.postModalShow.bind(this);
    this.postModalClose = this.postModalClose.bind(this);
  }

  postModalClose() {
    this.setState({ showModal: false });
  }

  postModalShow(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log("handleshow called in post modal");
    this.setState({ showModal: true });
  }

  render() {
    return (
      <>
        <div onDoubleClick={this.postModalShow}>
          <PostCard
            postID={this.props.post.post_id}
            upvotes={this.props.post.upvotes}
            authorPic={this.props.post.author_avatar}
            authorName={this.props.post.author_name}
            authorID={this.props.post.author_id}
            timestamp={this.props.post.timestamp}
            replies={this.props.post.replies}
            user={this.props.user}
            title={this.props.post.title}
            body={this.props.post.body}
          />
        </div>

        <ModalStyle
          size="xl"
          show={this.state.showModal}
          onHide={this.postModalClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Commenting on {this.props.post.author_name}'s post:{" "}
              {this.props.post.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <PostCard
              postID={this.props.post.post_id}
              upvotes={this.props.post.upvotes}
              authorPic={this.props.post.author_avatar}
              authorName={this.props.post.author_name}
              authorID={this.props.post.author_id}
              timestamp={this.props.post.timestamp}
              replies={this.props.post.replies}
              user={this.props.user}
              title={this.props.post.title}
              body={this.props.post.body}
            /> */}
            <Comments
              user={this.props.user}
              postID={this.props.post.post_id}
            ></Comments>
          </Modal.Body>
          <Modal.Footer />
        </ModalStyle>
      </>
    );
  }
}

export default class ForumPost extends React.Component {
  renderPosts(allPosts) {
    return allPosts.map((post, i) => {
      return <OpenPostModal post={post} user={this.props.user} key={i} />;
    });
  }

  render() {
    return (
      <>
        {(() => {
          if (this.props.posts) {
            return this.renderPosts(this.props.posts);
          } else {
            return <div>Loading...</div>;
          }
        })()}
      </>
    );
  }
}
