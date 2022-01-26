import React from "react";
import { Form, TextArea as SemanticTextArea } from "semantic-ui-react";

const TextArea = (props) => (
  <Form>
    <SemanticTextArea
      fluid
      name={props.name}
      error={props.error}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  </Form>
);

export default TextArea;
