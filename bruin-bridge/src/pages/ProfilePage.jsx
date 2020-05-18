import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import { majorList } from "./majors";
import { interestsList } from "./interests"
import EditableLabel from "react-inline-editing";
import Select from "react-select";

const Container = styled("div")`
  background-color: white;
  width: 95%;
  display: flex;
  justify-content: center;
  border-radius: 25px;
  margin-left: 2%;
  margin-right: 2%;
  padding-top: 50px;
`;

const BoldInfo = styled("div")`
  font-family: "Open Sans";
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  padding: 20px;
`;

const InfoContainer = styled("div")`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-top: 30px;
  width: 40%;
`;

const Pair = styled("div")`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 15px;
`;

class MajorDropdown extends React.Component {
  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={majorList}
      />
    );
  }
}

class InterestsDropdown extends React.Component {
  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={interestsList}
      />
    );
  }
}


// this.props.userInfo is an array of all the data of the user
export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      major: null,
      year: null,
      bio: null,
      karma: 0,
      interest1: null,
      interest2: null,
      interest3: null
    };

    this._handleFocus = this._handleFocus.bind(this);
    this._handleFocusOut = this._handleFocusOut.bind(this);
  }

  _handleFocus(text) {
    console.log("Focused with text: " + text);
  }

  _handleFocusOut(text) {
    console.log("Left editor with text: " + text);
    // need to send updates back to database
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#ADE1FF",
          width: "100%",
          height: "100vh"
        }}
      >
        <Container>
          {this.props.userInfo ? (
            <div>
              <img
                src={this.props.userInfo.photoURL}
                className={css`
                  border-radius: 50%;
                  height: 200px;
                  width: 200px;
                `}
              />
              <BoldInfo>{this.props.userInfo.displayName}</BoldInfo>
            </div>
          ) : (
            <div>No Name</div>
          )}

          <InfoContainer>
            <strong>Major: &#8287;</strong>
            <MajorDropdown></MajorDropdown>
            <Pair>
              <strong>Graduation Year: &#8287;</strong>
              <EditableLabel
                text="Click to Edit"
                labelClassName="GradYear"
                inputClassName="userGradYear"
                onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut}
              />
            </Pair>
            <Pair>
              <strong>Bio: &#8287;</strong>
              <EditableLabel
                text="Click to Edit"
                labelClassName="GradYear"
                inputClassName="userGradYear"
                onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut}
              />
            </Pair>
            <Pair>
              {" "}
              <strong>Karma: </strong>
              {this.state.karma}
            </Pair>
            <Pair>
              <strong>Interests: &#8287;</strong>
            </Pair>
            <InterestsDropdown></InterestsDropdown>
            <InterestsDropdown></InterestsDropdown>
            <InterestsDropdown></InterestsDropdown>
          </InfoContainer>
        </Container>
      </div>
    );
  }
}
