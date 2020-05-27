import React from "react";
import { getPosts } from "../firebase";
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
  }

  render() {
    const { upvotes, authorPic, authorName, title, body } = this.props;
    return (
      <PostBackground>
        <Votes>
          <TiThumbsUp size={40}></TiThumbsUp>
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
                upvotes={post.upvtes}
                authorPic={post.author_avatar}
                authorName={post.author_name}
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

        // <PostBackground>
        //   <Votes>
        //     <TiThumbsUp size={40}></TiThumbsUp>
        //     {post.upvotes}
        //     <TiThumbsDown size={40}></TiThumbsDown>
        //   </Votes>
        //   <Profile>
        //     <img
        //       src={post.author_avatar}
        //       className={css`
        //         border-radius: 50%;
        //         height: 65px;
        //         width: 65px;
        //       `}
        //     />
        //     <Name>{post.author_name}</Name>
        //   </Profile>
        //   <QuestionContainer>
        //     <QuestionStyle>{post.title}</QuestionStyle>
        //     <DescriptionStyle>{post.body}</DescriptionStyle>
        //   </QuestionContainer>
        // </PostBackground>
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
