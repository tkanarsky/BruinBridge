import React from "react";
import Select from "react-select";
import { updateUser, database } from "../firebase";
import { majorList } from "../pages/majors";

export default class MajorDropdown extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    selectedOption: this.props.curMajor
  };

  componentDidMount() {
    const { id, curMajor, handle } = this.props;
    this.setState({ selectedOption: curMajor });
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    updateUser(this.props.id, {major: selectedOption["value"]});
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
