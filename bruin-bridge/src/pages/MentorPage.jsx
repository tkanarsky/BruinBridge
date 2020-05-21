import React from "react";
import styled from "styled-components";

export default class MentorPage extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#ADE1FF",
          width: "100%",
          height: "100vh"
        }}
      >
        <h1>Mentor page</h1>
        <h2>Name: </h2>
        <h2>Major: </h2>
        <h2>Graduation Year: </h2>
        <h2>Shared Interests: </h2>
        <h2>Chat with mentor (will be link to chat with mentor page)</h2>
      </div>
    );
  }
}
