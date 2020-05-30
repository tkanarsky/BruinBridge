import React from "react";
import Select from "react-select";
import { updateUser } from "../database/userDatabase.js";
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
