import React from "react";
import { getPosts, upvotePost, getPost, removeVote } from "../firebase";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import Comments from "./Comments";
import Post from "./Post";

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
        <AccordionItem key={i}>
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
