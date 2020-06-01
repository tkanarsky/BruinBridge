import React from "react";
import { css } from "emotion";
import { timeSince } from "../database/postDatabase.js";
import styled from "styled-components";

const CommentsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 95%;
  border-radius: 5px;
  background-color: #e5e5e5;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 25px;
  height: 100%;
  box-shadow: 3px 3px 2px 2px #d8d8d8;
`;

/*
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
*/

const Profile = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  padding-right: 5px;
`;

const Name = styled("div")`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  padding-left: 5px;
`;

const ProfileContainer = styled("div")`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
`;

const CommentBody = styled("div")`
  width: 95%;
  font-size: 16px;
  flex-direction: column;
  padding-right: 20px;
  padding-bottom: 10px;
`;

const All = styled("div")`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
`;
export default class CommentCard extends React.Component {
  render() {
    return (
      <All>
        <CommentsContainer>
          <ProfileContainer>
            <Profile>
              <img
                src={this.props.authorPic}
                alt="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxfRU55yMsbgdDn_rpmnqf60WKvo157flOJxTdO3NkqG0guXn4&usqp=CAU"
                className={css`
                  border-radius: 50%;
                  height: 24px;
                  width: 24px;
                `}
              />
            </Profile>
            <Name>{this.props.authorName} posted {timeSince(this.props.timestamp)}</Name>
          </ProfileContainer>
          
          <CommentBody>{this.props.text}</CommentBody>
        </CommentsContainer>
      </All>
    );
  }
}
