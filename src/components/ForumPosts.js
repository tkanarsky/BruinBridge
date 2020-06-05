import React from "react";
import styled, { css } from "styled-components";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import Comments from "./Comments";
import PostCard from "./PostCard";

const ModalStyle = styled(Modal)`
  font-family: 'Balsamiq Sans';
  margin-top: 50px;
  margin-bottom: 50px;
  max-height: 100%;
  overflow-y: scroll;
`;

class OpenPostModal extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
      show: false,
    };
    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
  }

	render() {
		return (
			<>
        <div onClick={this.handleShow}>
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
          show={this.state.show}
          onHide={this.handleClose}
          centered
        >
					<Modal.Header closeButton>
            <Modal.Title>Commenting on {this.props.post.author_name}'s post: {this.props.post.title}</Modal.Title>
          </Modal.Header>
					<Modal.Body>
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
            <Comments user={this.props.user} postID={this.props.post.post_id}></Comments>
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
      return (
        <OpenPostModal post={post} user={this.props.user}/>
      );
    });
  }

  render() {
    return (
      <>
        {(() => {
          if (this.props.posts) {
            return (
              <Accordion allowMultipleExpanded={true} allowZeroExpanded={true}>
                {" "}
                {this.renderPosts(this.props.posts)}
              </Accordion>
            );
          } else {
            return <div>Loading...</div>;
          }
        })()}
      </>
    );
  }
}
