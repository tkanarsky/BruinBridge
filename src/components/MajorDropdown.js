import React from "react";
import Select from "react-select";
import { majorList } from "../constants/majors";

export default class MajorDropdown extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        selectedOption: this.props.curMajor
      };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    let newMajor = selectedOption["value"];
    let school = null;
    switch(newMajor) {
      case "Nursing":
        school = "School of Nursing"; break;
      case "Public Affairs":
        school = "Luskin School of Public Affairs"; break;
      case "Film & Television":
      case "Theater":
        school = "School of Theater, Film, and Television"; break;
      case "Architectural Studies":
      case "Art":
      case "Dance":
      case "Design | Media Arts":
      case "World Arts and Cultures":
        school = "School of the Arts and Architecture"; break;
      case "Ethnomusicology":
      case "Global Jazz Studies":
      case "Musicology":
      case "Music Composition":
      case "Music Education":
      case "Music History and Industry":
      case "Music Performance":
        school = "Herb Alpert School of Music"; break;
      case "Aerospace Engineering":
      case "Chemical Engineering":
      case "Bioengineering":
      case "Civil Engineering":
      case "Computer Engineering":
      case "Computer Science":
      case "Computer Science and Engineering":
      case "Electrical Engineering":
      case "Materials Engineering":
      case "Mechanical Engineering":
        school = "Samueli School of Engineering"; break;
      default:
        school = "College of Letters and Science";
    }
    this.props.handle(newMajor, school)
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
