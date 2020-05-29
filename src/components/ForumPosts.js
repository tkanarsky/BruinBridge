import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import Comments from "./Comments";
import PostCard from "./PostCard";

export default class ForumPost extends React.Component {
  renderPosts(allPosts) {
    return allPosts.map((post, i) => {
      return (
        <AccordionItem key={i}>
          <AccordionItemHeading>
            <AccordionItemButton>
              <PostCard
                postID={post.post_id}
                upvotes={post.upvotes}
                authorPic={post.author_avatar}
                authorName={post.author_name}
                user={this.props.user}
                title={post.title}
                body={post.body}
              ></PostCard>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <Comments user={this.props.user} postID={post.post_id}></Comments>
          </AccordionItemPanel>
        </AccordionItem>
      );
    });
  }

  render() {
    return (
      <>
        {(() => {
          if (this.props.posts) {
            return (
              <Accordion allowMultipleExpanded={true}>
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
