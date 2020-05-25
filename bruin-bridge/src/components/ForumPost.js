import React from "react";
import { getPosts, upvotePost } from "../firebase";
import styled from "styled-components";
import { css } from "emotion";
import { TiThumbsUp, TiThumbsDown, TiSupport } from "react-icons/ti";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import Comments from "./Comments";

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

const Profile = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  width: 15%;
`;
const Votes = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
    // this.state = {
    //   upvotes = this.props.upvotes
    // }
    this.handleUpvote = this.handleUpvote.bind(this);
  }

  handleUpvote() {
    let user = this.props.user;
    let userID = user.uid;
    upvotePost(userID, this.props.postID);
    // this.setState
    // ASK TIM FOR A FUNCTION THAT CHECKS IF CURRENT USER ID HAS ALREADY UPVOTED THE POST
    console.log("UPVOTED");
  }

  render() {
    const {
      postID,
      upvotes,
      authorPic,
      authorName,
      user,
      title,
      body
    } = this.props;
    // const {upvotes} = this.state;
    return (
      <PostBackground>
        <Votes>
          <TiThumbsUp size={40} onClick={this.handleUpvote}></TiThumbsUp>
          {upvotes}
          <TiThumbsDown size={40}></TiThumbsDown>
        </Votes>
        <Profile>
          <img
            src={authorPic}
            className={css`
              border-radius: 50%;
              height: 65px;
              width: 65px;
            `}
          />
          <Name>{authorName}</Name>
        </Profile>
        <QuestionContainer>
          <QuestionStyle>{title}</QuestionStyle>
          <DescriptionStyle>{body}</DescriptionStyle>
        </QuestionContainer>
      </PostBackground>
    );
  }
}

export default class ForumPost extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    posts: null
  };

  renderPosts(allPosts) {
    return allPosts.map((post, i) => {
      return (
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <Post
                postID={post.post_id}
                upvotes={post.upvotes}
                authorPic={post.author_avatar}
                authorName={post.author_name}
                user={this.props.user}
                title={post.title}
                body={post.body}
              ></Post>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <Comments></Comments>
            {
              // pass in prop to Comments ^^
            }
          </AccordionItemPanel>
        </AccordionItem>
      );
    });
  }

  render() {
    if (!this.state.posts)
      getPosts({ sort: "top", limit: 100 }, allPosts => {
        this.setState({ posts: allPosts });
      });
    return (
      <>
        {(() => {
          if (this.state.posts) {
            return (
              <Accordion allowMultipleExpanded={true}>
                {" "}
                {this.renderPosts(this.state.posts)}
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
