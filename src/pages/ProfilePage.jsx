import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import MajorDropdown from "../components/MajorDropdown";
import YearDropdown from "../components/YearDropdown";
import InterestsDropdown from "../components/InterestsDropdown";
import { updateUser, getUser } from "../database/userDatabase.js";
import EdiText from "react-editext";
import { mediaQueries } from "../constants/media";
import { BsPencil } from "react-icons/bs";
const { mobile } = mediaQueries;

const Container = styled("div")`
  background-color: white;
  width: 95%;
  position: relative;
  top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  margin-left: 2%;
  margin-right: 2%;
  padding-top: 50px;
  padding-bottom: 50px;
  ${mobile} {
    flex-direction: column;
  }
`;

const BoldInfo = styled("div")`
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
`;

const PicContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Pair = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 15px;
  flex-wrap: flex-wrap;
  ${mobile} {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;

const Button = styled("button")`
  display: flex;
  background-color: #fff7cc;
  border: 1px solid #ffd600;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 150px;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
  font-family: "Balsamiq Sans";
  justify-content: center;
  align-items: center;
  margin: 20px;

  &:hover {
    cursor: pointer;
    background-color: #ffd600;
  }
`;

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      major: null,
      school: null,
      year: null,
      bio: null,
      karma: 0,
      interest1: null,
      interest2: null,
      interest3: null,
      edit: false,
      i1: "",
      i2: "",
      i3: ""
    };
    this.handleMajor = this.handleMajor.bind(this);
    this.handleInterest1 = this.handleInterest1.bind(this);
    this.handleInterest2 = this.handleInterest2.bind(this);
    this.handleInterest3 = this.handleInterest3.bind(this);
    this.onSaveYear = this.onSaveYear.bind(this);
    this.onSaveBio = this.onSaveBio.bind(this);
    this.loadData = this.loadData.bind(this);
    this.Edit = this.Edit.bind(this);
  }

  loadData() {
    const { user } = this.props;
    console.log("load");
    if (user) {
      getUser(user.uid, userData => {
        this.setState({
          karma: userData.karma,
          major: {
            label: userData.major,
            value: userData.major
          },
          school: userData.school,
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
          i1: userData.interest1,
          i2: userData.interest2,
          i3: userData.interest3,
          dataLoaded: true
        });
      });
    }
  }

  Edit() {
    this.setState({ edit: !this.state.edit });
    this.loadData();
  }

  handleMajor(major, school) {
    this.setState({ major: major, school: school });
    updateUser(this.props.user.uid, { major: major, school: school });
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
          if (
            this.props.user &&
            this.state.major &&
            this.state.interest1 &&
            this.state.edit
          ) {
            return (
              <Container>
                <PicContainer>
                  <img
                    src={this.props.user.photoURL}
                    alt="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxfRU55yMsbgdDn_rpmnqf60WKvo157flOJxTdO3NkqG0guXn4&usqp=CAU"
                    className={css`
                      border-radius: 50%;
                      height: 200px;
                      width: 200px;
                      ${mobile} {
                        width: 100px;
                        height: 100px;
                      }
                    `}
                  />
                  <BoldInfo>{this.props.user.displayName}</BoldInfo>
                  <Pair>
                    {" "}
                    <strong>Karma: &#8287;</strong>
                    {this.state.karma}
                  </Pair>
                </PicContainer>
                <InfoContainer>
                  <strong>Major: &#8287;</strong>
                  <MajorDropdown
                    curMajor={this.state.major}
                    handle={this.handleMajor}
                  ></MajorDropdown>
                  <Pair>
                    <strong>College: {this.state.school} &#8287;</strong>
                  </Pair>
                  <Pair>
                    <strong>Graduation Year: &#8287;</strong>
                    <YearDropdown
                      curYear={this.state.year}
                      handle={this.onSaveYear}
                    ></YearDropdown>
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
                    <strong>Interests: &#8287;</strong>
                  </Pair>
                  <InterestsDropdown
                    id={this.props.user.uid}
                    curInt1={this.state.interest1}
                    curInt2={this.state.interest2}
                    curInt3={this.state.interest3}
                    handle={this.handleInterest}
                  ></InterestsDropdown>
                  <Button onClick={this.Edit}>Done</Button>
                </InfoContainer>
              </Container>
            );
          } else if (
            this.props.user &&
            !this.state.edit &&
            this.state.major &&
            this.state.interest1
          ) {
            return (
              <Container>
                <PicContainer>
                  <img
                    src={this.props.user.photoURL}
                    alt="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxfRU55yMsbgdDn_rpmnqf60WKvo157flOJxTdO3NkqG0guXn4&usqp=CAU"
                    className={css`
                      border-radius: 50%;
                      height: 200px;
                      width: 200px;
                      ${mobile} {
                        width: 100px;
                        height: 100px;
                      }
                    `}
                  />
                  <BoldInfo>{this.props.user.displayName}</BoldInfo>
                  <Pair>
                    {" "}
                    <strong>Karma: &#8287;</strong>
                    {this.state.karma}
                  </Pair>
                </PicContainer>
                <InfoContainer>
                  <Pair>
                    <strong>Major: &#8287;</strong>
                    {this.state.major.value}
                  </Pair>
                  <Pair>
                    <strong>College: &#8287;</strong>
                    {this.state.school}
                  </Pair>
                  <Pair>
                    <strong>Graduation Year: &#8287;</strong>
                    {this.state.year}
                  </Pair>
                  <Pair>
                    <strong>Bio: &#8287;</strong>
                    {this.state.bio}
                  </Pair>
                  <Pair>
                    <strong>Interests: &#8287;</strong>
                    {this.state.i1}
                    {", "}
                    {this.state.i2}
                    {", "}
                    {this.state.i3}
                  </Pair>
                  <Button onClick={this.Edit}>
                    <BsPencil />
                    &nbsp; Edit
                  </Button>
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
