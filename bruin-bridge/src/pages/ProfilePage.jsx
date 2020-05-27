import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import MajorDropdown from "../components/MajorDropdown";
import InterestsDropdown from "../components/InterestsDropdown";
import { updateUser, getUser } from "../firebase";
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
  padding-bottom: 50px;
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
    this.handleInterest1 = this.handleInterest1.bind(this);
    this.handleInterest2 = this.handleInterest2.bind(this);
    this.handleInterest3 = this.handleInterest3.bind(this);
    this.onSaveYear = this.onSaveYear.bind(this);
    this.onSaveBio = this.onSaveBio.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    const { user } = this.props;
    console.log("load");
    if (user) {
      getUser(user.uid, userData => {
        this.setState({
          major: [
            {
              label: userData.major,
              value: userData.major
            }
          ],
          bio: userData.bio,
          year: userData.year,
          interest1: [
            {
              label: userData.interest1,
              value: userData.interest1
            }
          ],
          interest2: [
            {
              label: userData.interest2,
              value: userData.interest2
            }
          ],
          interest3: [
            {
              label: userData.interest3,
              value: userData.interest3
            }
          ],
          dataLoaded: true
        });
      });
    }
  }

  handleMajor(m) {
    this.setState({ major: m });
  }

  handleInterest1(i) {
    this.setState({ interest1: i });
  }
  handleInterest2(i) {
    this.setState({ interest2: i });
  }
  handleInterest3(i) {
    this.setState({ interest3: i });
  }

  onSaveYear(newYear) {
    this.setState({ year: newYear });
    updateUser(this.props.user.uid, { year: newYear });
  }

  onSaveBio(newBio) {
    this.setState({ bio: newBio });
    updateUser(this.props.user.uid, { bio: newBio });
  }

  render() {
    if (!this.state.dataLoaded) {
      this.loadData();
    }
    return (
      <div
        style={{
          backgroundColor: "#ADE1FF",
          width: "100%",
          height: "100vh"
        }}
      >
        {(() => {
          if (this.props.user && this.state.major && this.state.interest1) {
            return (
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
                  <InterestsDropdown
                    id={this.props.user.uid}
                    curInt1={this.state.interest1}
                    curInt2={this.state.interest2}
                    curInt3={this.state.interest3}
                    handle={this.handleInterest}
                  ></InterestsDropdown>
                </InfoContainer>
              </Container>
            );
          } else if (this.props.user && !this.state.major) {
            return <Container>Loading...</Container>;
          } else {
            return <Container>Login to see your profile!</Container>;
          }
        })()}
      </div>
    );
  }
}
