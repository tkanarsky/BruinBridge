import React from "react";
import Select from "react-select";
import styled from "styled-components";

let yearList = [];
for (var i = 2018; i < 2027; i++) {
  yearList.push({
    label: i,
    value: i
  });
}

const YearDrop = styled("div")`
  width: 100%;
`;

export default class YearDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: this.props.curYear
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    let year = selectedOption["value"];
    this.props.handle(year);
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <YearDrop>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={yearList}
        />
      </YearDrop>
    );
  }
}
