import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import { majors } from "./majors";
import InlineEdit from "react-inline-editing";
import EditableLabel from "react-inline-editing";

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




class ExampleInlineEditDefault extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    inlineValue: 'Example value'
  }

  handleSave = event => {
    if (event.target.name === 'test') {
      this.setState({ inlineValue: event.target.value })
    }
  }

  render = () => {
    return (
      <div>
        <InlineEdit name='test' value={this.state.inlineValue} changeCallback={this.handleSave} />
        <code>The Inline Edit value is '{this.state.inlineValue}'.</code>
      </div>
    )
  }
}

// this.props.userInfo is an array of all the data of the user
export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      major: null,
      year: null
    };
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
        </Container>
          <h2>Major: 
            <EditableLabel text='Edit Here'
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                save={value => {
                  console.log(`Saving '${value}'`);
                }}
            /> 
            </h2>

          <h2>Graduation Year: 
            <EditableLabel text='Edit Here'
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut}
            /> 
            </h2>

          <h2>Interests: 
            <EditableLabel text='Edit Here'
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut}
            />
            <EditableLabel text='Edit Here'
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut}
            />
            <EditableLabel text='Edit Here'
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut}
            />
            </h2>

          <h2>Bio: 
          <EditableLabel text='Edit Here'
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut}
            />
            </h2>

          <h2>Karma: </h2>

      </div>
    );
  }
}
