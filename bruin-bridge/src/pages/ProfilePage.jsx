import React from "react";
import styled from "styled-components";

export default class ProfilePage extends React.Component {
  render() {
    return (
      <div>
        This is the profile page
        <div>
          {this.props.userInfo ? (
            <div>Name: {this.props.userInfo.displayName}</div>
          ) : (
            <div>No Name Found</div>
          )}
        </div>
      </div>
    );
  }
}
