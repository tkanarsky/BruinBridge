import React from "react";
import styled from "styled-components";
import { createPost, getPosts } from "../database/postDatabase.js";
import ForumPosts from "../components/ForumPosts";
import { mediaQueries } from "../constants/media";
import { IoIosRocket } from "react-icons/io";
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
const { mobile, notMobile } = mediaQueries;

const SchoolContainer = styled("div")`
  width: 20%;
  height: 90%;
  position: sticky;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin-left: 30px;
  margin-right: 10px;
  padding: 25px;
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
  white-space: nowrap;
  ${mobile} {
    display: none;
  }
`;

const FactHolder = styled("div")`
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled("div")`
  background-color: white;
  border-radius: 25px;
  width: 95%;
  height: 80%;
  margin-top: 25px;
  padding: 20px;
  overflow: scroll;
  ${mobile} {
    padding: 10px;
  }
`;

const SubmitQuestion = styled("div")`
  background-color: white;
  border-radius: 20px;
  width: 97%;
  height: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
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
  font-size: 18px;
  width: 100px;
  height: 40px;
  margin-left: 15px;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`;

export default class ForumPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postInput: "",
      title: "",
      posts: null,
      postOrder: "top"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
  }

  componentDidMount() {
    this.loadPosts(this.state.postOrder);
  }

  loadPosts(order) {
    this.setState({ postOrder: order });
    getPosts({ sort: order, limit: 100 }, allPosts => {
      this.setState({ posts: allPosts }, () => this.forceUpdate());
    });
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
      console.log("Created post!");
      // alert(this.state.title + " Post: " + this.state.postInput); //testing purposes can delete later
      this.loadPosts(this.state.postOrder);
    } else alert("You must be logged in to submit a post!");
    event.preventDefault();
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
            <FactHolder>
              <Fact>#1 Public University!</Fact>
              <Fact>#1 College Dining Hall Food!</Fact>
              <Fact>yay woooooooo</Fact>
              <Fact>more info here</Fact>
            </FactHolder>
          </SchoolContainer>
          <QuestionsContainer>
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
                  <label
                    style={{
                      paddingLeft: "25px",
                      paddingRight: "10px"
                    }}
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    value={this.state.postInput}
                    onChange={this.handleChange}
                    style={{
                      lineHeight: "2em",
                      fontSize: "16px",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      flexGrow: 2
                    }}
                  />
                  <input
                    type="submit"
                    value="Submit"
                    style={{
                      backgroundColor: "#ffe457",
                      fontFamily: "Balsamiq Sans",
                      fontWeight: 700,
                      fontSize: "15px",
                      marginLeft: "25px",
                      borderRadius: "20px",
                      width: "100px",
                      height: "50px"
                    }}
                  />
                </FlexBox>
              </form>
            </SubmitQuestion>
            <PostContainer>
              <Filters>
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
