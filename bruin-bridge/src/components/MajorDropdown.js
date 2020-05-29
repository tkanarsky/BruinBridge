import React from "react";
import Select from "react-select";
import { updateUser } from "../firebase";
import { majorList } from "../constants/majors";

export default class MajorDropdown extends React.Component {
  state = {
    selectedOption: this.props.curMajor
  };

  componentDidMount() {
    this.setState({ selectedOption: this.props.curMajor });
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    updateUser(this.props.id, { major: selectedOption["value"] });
    if (selectedOption["value"] === "Nursing"){
      updateUser(this.props.id, { school: "School of Nursing" });
    }
    else if(selectedOption["value"] === "Public Affairs"){
      updateUser(this.props.id, { school: "Luskin School of Public Affairs" });
    }
    else if (selectedOption["value"] === "Film & Television" || selectedOption["value"] === "Theater"){
      updateUser(this.props.id, { school: "School of Theater, Film and Television" });
    }
    else if (selectedOption["value"] === "Architectural Studies" || selectedOption["value"] === "Art" || selectedOption["value"] === "Dance" || selectedOption["value"] === "Design | Media Arts" || selectedOption["value"] === "World Arts and Cultures"){
      updateUser(this.props.id, { school: "School of the Arts and Architecture"});
    }
    else if (selectedOption["value"] === "Ethnomusicology" || selectedOption["value"] === "Global Jazz Studies" || selectedOption["value"] === "Musicology" || selectedOption["value"] === "Music Composition" || selectedOption["value"] === "Music Education" || selectedOption["value"] === "Music History and Industry" || selectedOption["value"] === "Music Performance"){
      updateUser(this.props.id, { school: "Herb Alpert School of Music"});
    }
    else if (selectedOption["value"] === "Aerospace Engineering" || selectedOption["value"] === "Bioengineering" || selectedOption["value"] === "Chemical Engineering" || selectedOption["value"] === "Civil Engineering" || selectedOption["value"] === "Computer Engineering" || selectedOption["value"] === "Computer Science" || selectedOption["value"] === "Computer Science and Engineering" || selectedOption["value"] === "Electrical Engineering" || selectedOption["value"] === "Materials Engineering" || selectedOption["value"] === "Mechanical Engineering"){
      updateUser(this.props.id, { school: "Samueli School of Engineering"});
    }
    else{
      updateUser(this.props.id, { school: "College of Letters and Science" });
    }
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
