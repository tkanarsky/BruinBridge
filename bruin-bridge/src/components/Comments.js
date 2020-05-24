import React from "react";
import styled from "styled-components";
import { css } from "emotion";

const CommentsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  width: 90%;
  border-radius: 5px;
  background-color: #e5e5e5;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Profile = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 10%;
`;

const Name = styled("div")`
  font-weight: 700;
  padding-top: 10px;
  font-size: 12px;
`;

const All = styled("div")`
  display: flex;
  justify-content: flex-end;
`;

class CommentCard extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }
  render() {
    //const { } = this.props;
    return (
      <All>
        <CommentsContainer>
          <Profile>
            <img
              src="https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              className={css`
                border-radius: 50%;
                height: 45px;
                width: 45px;
              `}
            />
            <Name>first last</Name>
          </Profile>
          insert comment body here
        </CommentsContainer>
      </All>
    );
  }
}

export default class Comments extends React.Component {
  render() {
    return <CommentCard></CommentCard>;
  }
}
