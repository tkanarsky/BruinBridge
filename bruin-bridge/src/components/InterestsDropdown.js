import React from "react";
import Select from "react-select";
import { updateUser } from "../firebase";
import { interestsList } from "../constants/interests";

export default class InterestsDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.loadInterests = this.loadInterests.bind(this);
  }
  state = {
    selectedOption1: null,
    selectedOption2: null,
    selectedOption3: null,
    loaded: false
  };

  componentDidMount() {
    if (!this.state.loaded) {
      this.loadInterests();
    }
  }

  loadInterests() {
    if (!this.state.loaded) {
      let c1 = this.props.curInt1[0];
      let c2 = this.props.curInt2[0];
      let c3 = this.props.curInt3[0];
      this.setState({ selectedOption1: c1 });
      this.setState({ selectedOption2: c2 });
      this.setState({ selectedOption3: c3 });
      this.setState({ loaded: true });
    }
  }

  handleChange1 = selectedOption => {
    if (
      selectedOption["value"] !== this.state.selectedOption2["value"] &&
      selectedOption["value"] !== this.state.selectedOption3["value"]
    ) {
      this.setState({ selectedOption1: selectedOption });
      updateUser(this.props.id, { interest1: selectedOption["value"] });
    } else {
      alert("You cannot repeat interests!");
    }
  };

  handleChange2 = selectedOption => {
    if (
      selectedOption["value"] !== this.state.selectedOption1["value"] &&
      selectedOption["value"] !== this.state.selectedOption3["value"]
    ) {
      this.setState({ selectedOption2: selectedOption });
      updateUser(this.props.id, { interest2: selectedOption["value"] });
    } else {
      alert("You cannot repeat interests!");
    }
  };

  handleChange3 = selectedOption => {
    if (
      selectedOption["value"] !== this.state.selectedOption1["value"] &&
      selectedOption["value"] !== this.state.selectedOption2["value"]
    ) {
      this.setState({ selectedOption3: selectedOption });
      updateUser(this.props.id, { interest3: selectedOption["value"] });
    } else {
      alert("You cannot repeat interests!");
    }
  };

  render() {
    const { selectedOption1, selectedOption2, selectedOption3 } = this.state;
    if (!this.state.loaded) {
      this.loadInterests();
    }
    return (
      <div>
        <Select
          value={selectedOption1}
          onChange={this.handleChange1}
          options={interestsList}
        />
        <Select
          value={selectedOption2}
          onChange={this.handleChange2}
          options={interestsList}
        />
        <Select
          value={selectedOption3}
          onChange={this.handleChange3}
          options={interestsList}
        />
      </div>
    );
  }
}
