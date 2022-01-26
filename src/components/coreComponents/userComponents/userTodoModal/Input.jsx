import React from "react";
import { Input as SemanticInput } from "semantic-ui-react";

const Input = (props) => (
  <SemanticInput
    fluid
    name={props.name}
    error={props.error}
    placeholder={props.placeholder}
    onChange={props.onChange}
    value={props.value}
    loading={props.loading}
    icon={props.icon ? "search" : ""}
  />
);

export default Input;
