import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import { interestsList } from "./interests";
import EditableLabel from "react-inline-editing";
import Select from "react-select";
import MajorDropdown from "../components/MajorDropdown";
import { database } from "../firebase";
import EdiText from "react-editext";

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
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const InfoContainer = styled("div")`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-top: 30px;
  width: 40%;
`;

const PicContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Pair = styled("div")`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 15px;
`;

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
      // MAJOR TO BE AN OBJECT {label: "...", value: "..."}
      // THIS IS NEEDED FOR DROPDOWN SELECT TO WORK!!!!
      year: null,
      bio: null,
      karma: 0,
      interest1: null,
      interest2: null,
      interest3: null
    };
    this.handleMajor = this.handleMajor.bind(this);
    this.onSaveYear = this.onSaveYear.bind(this);
    this.onSaveBio = this.onSaveBio.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      let userRef = database.ref("users/" + user.uid);
      let majorRef = userRef.child("major");
      majorRef.on("value", snapshot => {
        let m = [];
        m.push({
          label: snapshot.val(),
          value: snapshot.val()
        });
        this.setState({ major: m });
        console.log(m);
      });
      let bioRef = userRef.child("/bio");
      bioRef.on("value", snapshot => {
        this.setState({ bio: snapshot.val() });
      });
      let yearRef = userRef.child("/year");
      yearRef.on("value", snapshot => {
        this.setState({ year: snapshot.val() });
      });
    }
  }

  // componentWillUnmount() {
  //   const { user } = this.props;
  //   if (user) {
  //     let userRef = database.ref("users/" + user.uid);
  //     let majorRef = userRef.child("major");
  //     majorRef.on("value", snapshot => {
  //       let m = [];
  //       m.push({
  //         label: snapshot.val(),
  //         value: snapshot.val()
  //       });
  //       this.setState({ major: m });
  //       console.log(m);
  //     });
  //     let bioRef = userRef.child("/bio");
  //     bioRef.on("value", snapshot => {
  //       this.setState({ bio: snapshot.val() });
  //     });
  //     let yearRef = userRef.child("/year");
  //     yearRef.on("value", snapshot => {
  //       this.setState({ year: snapshot.val() });
  //     });
  //   }
  // }

  handleMajor(m) {
    this.setState({ major: m });
  }

  onSaveYear(newYear) {
    this.setState({ year: newYear });
    var ref = database.ref("users/" + this.props.user.uid);
    ref.update({ year: newYear });
  }

  onSaveBio(newBio) {
    this.setState({ bio: newBio });
    var ref = database.ref("users/" + this.props.user.uid);
    ref.update({ bio: newBio });
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
        {this.props.user && this.state.major ? (
          <Container>
            <PicContainer>
              <img
                src={this.props.user.photoURL}
                className={css`
                  border-radius: 50%;
                  height: 200px;
                  width: 200px;
                `}
              />
              <BoldInfo>{this.props.user.displayName}</BoldInfo>
            </PicContainer>
            <InfoContainer>
              <strong>Major: &#8287;</strong>
              <MajorDropdown
                id={this.props.user.uid}
                curMajor={this.state.major}
                handle={this.handleMajor}
              ></MajorDropdown>
              <Pair>
                <strong>Graduation Year: &#8287;</strong>
                <EdiText
                  type="textarea"
                  saveButtonContent="Apply"
                  cancelButtonContent={<strong>Cancel</strong>}
                  editButtonContent="Edit"
                  value={this.state.year}
                  onSave={this.onSaveYear}
                />
              </Pair>
              <Pair>
                <strong>Bio: &#8287;</strong>
                <EdiText
                  type="textarea"
                  saveButtonContent="Apply"
                  cancelButtonContent={<strong>Cancel</strong>}
                  editButtonContent="Edit"
                  value={this.state.bio}
                  onSave={this.onSaveBio}
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
        ) : (
          <div>Login to view your profile!</div>
        )}
      </div>
    );
  }
}
