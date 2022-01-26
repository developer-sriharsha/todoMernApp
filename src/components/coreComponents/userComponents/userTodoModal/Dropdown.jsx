import React from "react";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";

const Dropdown = (props) => (
  <SemanticDropdown
    error={props.error}
    name={props.name}
    placeholder="Select Priority"
    fluid
    search
    selection
    options={props.options ? props.options : []}
    onChange={props.onChange}
    value={props.value}
  />
);

export default Dropdown;
