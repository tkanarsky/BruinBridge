import React from "react";
import { css } from "emotion";
import styled from "styled-components";
import { Fade } from "react-reveal";

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
export default class CommentCard extends React.Component {
  render() {
    return (
        <Fade down distance={"15px"} duration={500}>
        <All> 
          <CommentsContainer>
            <Profile>
              <img
                src={this.props.authorPic}
                alt="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxfRU55yMsbgdDn_rpmnqf60WKvo157flOJxTdO3NkqG0guXn4&usqp=CAU"
                className={css`
                  border-radius: 50%;
                  height: 45px;
                  width: 45px;
                `}
              />
              <Name>{this.props.authorName}</Name>
            </Profile>
            <CommentBody>{this.props.text}</CommentBody>
          </CommentsContainer>
        </All>
        </Fade>
    );
  }
}
