import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import Modal from "react-bootstrap/Modal";
import Input from "./Input";
import TextArea from "./TextArea";
import Dropdown from "./Dropdown";
import {
  validateForm,
  postServiceCALLS,
  getCacheObject,
} from "../../../tools/helpers";
import { getSocketIOInstance } from "../../SocketIO";
import { toastMessage } from "../../../tools/Toaster";
import config from "../../../tools/config";

const statusOptions = [
  { key: "1", value: 1, icon: "circle", text: "Active" },
  { key: "0", value: 0, icon: "check circle", text: "Done" },
];

const priorityOptions = [
  { key: "1", value: 1, icon: "circle", text: "High" },
  { key: "2", value: 2, icon: "adjust", text: "Medium" },
  { key: "3", value: 3, icon: "circle outline", text: "Low" },
];

var socket;

const UserTodoModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setOpen(props.open);
    if (props.updateTodo) {
      setState(props.updateTodoObject);
    } else {
      setState({});
    }
  }, [props.open]);

  const handleAddTodoObject = (e, { name, value }) => {
    setState({ ...state, [name]: value });
  };

  const handleAddTodoObjectForInputs = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    setState(state);
  }, [state]);

  const handleSubmit = async () => {
    let validationFields = {
      todoTitle: "",
      todoPriority: "",
    };
    let validateFormResults = validateForm(state, validationFields);
    setErrors(validateFormResults.errors);
    if (!validateFormResults.formIsValid) {
      return false;
    }
    let result = await postServiceCALLS(
      props.updateTodo ? "/usertodos/updatetodo" : "/usertodos/createtodo",
      state
    );
    if (result.status) {
      //socket realted code START
      let action = getCacheObject(config.SESSION_KEY_NAME);
      action.action = `${props.updateTodo ? "UPDATE" : "ADD"}`;
      if (props.updateTodo) {
        action.todoPriority = state.todoPriority;
      }
      socket.emit("Todo", action, (error) => {
        if (error) {
          alert(error);
        }
      });
      // END

      toastMessage(result.message, "success");
      clearFields();
    }
  };

  const clearFields = () => {
    props.onClose();
    setErrors({});
    setState({});
    props.setUpdateTodo(false);
  };

  useEffect(() => {
    socket = getSocketIOInstance();
  }, []);

  return (
    <Modal
      // {...props}
      show={open}
      animation
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.updateTodo ? "Update Todo" : "Add Todo"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-md-12">
          <div className="flex">
            <div className="col-md-6">
              <h4>Todo Title</h4>
              <Input
                placeholder="Enter todo title"
                error={errors.todoTitle ? true : false}
                name="todoTitle"
                onChange={handleAddTodoObjectForInputs}
                value={state.todoTitle}
              />
            </div>
            <div className="col-md-6">
              <h4>Todo Priority</h4>
              <Dropdown
                error={errors.todoPriority ? true : false}
                name="todoPriority"
                onChange={handleAddTodoObject}
                options={priorityOptions}
                value={state.todoPriority}
              />
            </div>
          </div>
        </div>
        {props.updateTodo ? (
          <div className="col-md-12 mt-3">
            <div className="col-md-12">
              <h4>Todo Status</h4>
              <Dropdown
                error={errors.todoStatus ? true : false}
                name="todoStatus"
                onChange={handleAddTodoObject}
                options={statusOptions}
                value={state.todoStatus}
              />
            </div>
          </div>
        ) : null}
        <div className="col-md-12 mt-3">
          <div className="col-md-12">
            <h4>Todo Description</h4>
            <TextArea
              placeholder="Todo Description"
              name="todoDescription"
              onChange={handleAddTodoObjectForInputs}
              value={state.todoDescription}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="red" onClick={clearFields}>
          Cancel
        </Button>
        <Button
          content={props.updateTodo ? "Update Todo" : "Add Todo"}
          labelPosition="right"
          icon="checkmark"
          onClick={handleSubmit}
          positive
        />
      </Modal.Footer>
    </Modal>
  );
};

export default UserTodoModal;
