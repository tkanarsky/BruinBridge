import React from "react";
import styled, { css } from "styled-components";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { createPost, getPosts } from "../database/postDatabase.js";
import ForumPosts from "../components/ForumPosts";
import { mediaQueries } from "../constants/media";
import { IoIosRocket } from "react-icons/io";
import { BsPencil } from "react-icons/bs";
import { facts } from "../constants/facts.js";
import { Fade } from "react-reveal"
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
const { mobile, notMobile } = mediaQueries;

const SchoolContainer = styled("div")`
  width: 20%;
  height: 95%;
  position: sticky;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  box-sizing: border-box;
  ${notMobile} {
    background-color: white;
  }
  ${mobile} {
    background-color: "#ADE1FF";
    width: 75%;
    height: 10%;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Button = styled("button")`
  display: flex;
  background-color: #0e92fb;
  border: 1px solid #ade1ff;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 200px;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
  font-family: "Balsamiq Sans", "Open Sans", sans-serif;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  /* margin: 20px; */
  color: white;

  &:hover {
    cursor: pointer;
    background-color: #61b9ff;
  }
`;

const CreatePostButton = styled(Button)`
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: red;
  &:hover {
    background-color: #ff5b96;
  }
`;

const UCLAimg = styled("div")`
  background-image: url("https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_91c6277d-4277-42e0-b87d-aedcf49e070c-prv.jpg");
  width: 250px;
  height: 250px;
  min-width: 100px;
  min-height: 100px;
  border-radius: 50%;
  background-position: center;
  margin-bottom: 30px;
  ${mobile} {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
`;

const UCLAname = styled("div")`
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/University_of_California%2C_Los_Angeles_logo.svg/1200px-University_of_California%2C_Los_Angeles_logo.svg.png");
  min-width: 175px;
  min-height: 75px;
  background-size: contain;
  background-repeat: no-repeat;
  padding: 5px;
  ${mobile} {
    width: 100px;
    height: 40px;
  }
`;

const Fact = styled("div")`
  font-size: 18px;
  ${mobile} {
    display: none;
  }
`;

const FactHeading = styled(Fact)`
font-weight: 700;
`;

const FactHolder = styled("div")`
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled("div")`
  background-color: white;
  border-radius: 25px;
  width: 98%;
  height: 95%;
  padding: 20px 20px 20px;
  box-sizing: border-box;
  overflow: scroll;
  ${mobile} {
    padding: 10px;
  }
`;

const SubmitQuestion = styled("div")`
  background-color: white;
  border-radius: 20px;
  width: 98%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  ${mobile} {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const FlexBox = styled("div")`
  display: flex;
  flex-direction: row wrap;
  justify-content: start;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  ${mobile} {
    flex-direction: column;
  }
`;

const QuestionsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const AllContainer = styled("div")`
  display: flex;
  flex-direction: row;
  padding-top: 25px;
  height: 100%;
  padding-bottom: 25px;
  ${mobile} {
    flex-direction: column;
    align-items: center;
  }
`;

const Filters = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 8px 20px 0px 20px;
`;

const FilterButton = styled("button")`
  background-color: #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 18px;
  width: 100px;
  height: 40px;
  margin-left: 15px;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
    background-color: #f6f6f6;
  }
`;

const FilterPostButtons = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  ${mobile} {
    flex-direction: column;
  }
`;

const ModalStyle = styled(Modal)`
  font-family: "Balsamiq Sans";
`;

class SubmitPostModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      postInput: "",
      title: ""
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange(event) {
    this.setState({ postInput: event.target.value });
  }

  handleTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.title === "") {
      alert("Must have post title");
      return;
    }
    if (this.state.postInput === "") {
      alert("Must not submit blank question");
      return;
    }
    if (this.props.user) {
      createPost(
        this.props.user,
        this.state.title,
        this.state.postInput,
        postId => {}
      );
      alert("Post submitted successfully!");
      getPosts({ sort: "top", limit: 100 }, allPosts => {
        this.setState({ title: "", postInput: "", posts: allPosts });
      });
      //this.loadPosts(this.state.postOrder);
    } else alert("You must be logged in to submit a post!");
    this.handleClose();
    event.preventDefault();
  }

  render() {
    return (
      <>
        <CreatePostButton variant="primary" onClick={this.handleShow}>
          <BsPencil />
          &nbsp; Create a Post &nbsp;
        </CreatePostButton>

        <ModalStyle
          size="lg"
          show={this.state.show}
          onHide={this.handleClose}
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SubmitQuestion>
              <form onSubmit={this.handleSubmit}>
                <FlexBox>
                  <label
                    style={{
                      paddingRight: "10px"
                    }}
                  >
                    Title
                  </label>
                </FlexBox>
                <FlexBox>
                  <input
                    type="text"
                    value={this.state.title}
                    onChange={this.handleTitle}
                    style={{
                      lineHeight: "2em",
                      fontSize: "16px",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      flexGrow: 1
                    }}
                  />
                </FlexBox>
                <FlexBox>
                  <label
                    style={{
                      paddingTop: "10px",
                      paddingRight: "10px"
                    }}
                  >
                    <span>Description</span>
                  </label>
                </FlexBox>
                <FlexBox>
                  <textarea
                    value={this.state.postInput}
                    onChange={this.handleChange}
                    style={{
                      lineHeight: "1.5em",
                      resize: "none",
                      overflow: "scroll",
                      height: "200px",
                      fontSize: "16px",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      flexGrow: 5
                    }}
                  />
                </FlexBox>
                <FlexBox></FlexBox>
              </form>
            </SubmitQuestion>
          </Modal.Body>
          <Modal.Footer>
            <CancelButton onClick={this.handleClose}>Cancel</CancelButton>
            <Button onClick={this.handleSubmit}>Post</Button>
          </Modal.Footer>
        </ModalStyle>
      </>
    );
  }
}

export default class ForumPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      postOrder: "top"
    };
    this.loadPosts = this.loadPosts.bind(this);
  }

  componentDidMount() {
    this.loadPosts(this.state.postOrder);
  }

  loadPosts(order) {
    this.setState({ postOrder: order });
    getPosts({ sort: order, limit: 100 }, allPosts => {
      if (this.state.factNum)
        this.setState({ posts: allPosts }, () => this.forceUpdate());
      else this.setState({ posts: allPosts, factNum: Math.floor(Math.random() * facts.length) }, () => this.forceUpdate());
    });
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
        <AllContainer>
          <SchoolContainer>
            <UCLAimg></UCLAimg>
            <UCLAname></UCLAname>
            {this.state.factNum &&
              <Fade duration={500}>
                <FactHolder>
                  <FactHeading>Fun fact: </FactHeading>
                  <Fact>{facts[this.state.factNum]}</Fact>
                </FactHolder>
              </Fade>
            }
            
          </SchoolContainer>
          <QuestionsContainer>
            <PostContainer>
              <FilterPostButtons>
                <SubmitPostModal user={this.props.user} />
                <Filters>
                  Sort by:
                  <FilterButton onClick={() => this.loadPosts("top")}>
                    <IoIosRocket />
                    &nbsp; Top
                  </FilterButton>
                  <FilterButton onClick={() => this.loadPosts("new")}>
                    <FaSortAmountUpAlt />
                    &nbsp; New
                  </FilterButton>
                  <FilterButton onClick={() => this.loadPosts("old")}>
                    <FaSortAmountDown />
                    &nbsp; Old
                  </FilterButton>
                </Filters>
              </FilterPostButtons>
              <ForumPosts
                user={this.props.user}
                posts={this.state.posts}
              ></ForumPosts>
            </PostContainer>
          </QuestionsContainer>
        </AllContainer>
      </div>
    );
  }
}
