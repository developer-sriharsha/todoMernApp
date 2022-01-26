import React, { useState, useEffect } from "react";
import NavBar from "../navs/navBar";
import SideBar from "../navs/sideBar";
import { Button, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import TodoDataTable from "../plugins/TodoDataTable";
import { columns } from "../plugins/DataTableColumnConfiguration";
import UserTodoModal from "./userTodoModal/UserTodoModal";
import { toastMessage } from "../../tools/Toaster";
import Input from "./userTodoModal/Input";
import { useDispatch, useSelector, connect } from "react-redux";
import { GetUserTodos } from "../../Redux/userActions/UserTodoAction";
import {
  globalSearch,
  postServiceCALLS,
  getCacheObject,
} from "../../tools/helpers";
import { getSocketIOInstance } from "../SocketIO";
import config from "../../tools/config";
import { AdminCards } from "../adminCompos/AdminCards";

const UserContent = () => {
  const [addTodo, setAddTodo] = useState(false);
  const [updateTodoObject, setupdateTodoObject] = useState({});
  const [updateTodo, setUpdateTodo] = useState(false);
  const [todos, setTodos] = useState([]);
  let dispatch = useDispatch();
 
  const userTodos = useSelector((state) => state.userTodos.userTodos);
  const broadCastUpdates = useSelector((state) => state.userTodos.broadCastUpdates);
  useEffect(() => {
    dispatch(GetUserTodos({}));
  }, []);
  useEffect(() => {
    setTodos(userTodos && userTodos.status ? userTodos.data : []); 
  }, [userTodos,broadCastUpdates]);

  const handleActionsFromDataTable = async (e, row) => {
    const id = e.target.id;
    if (id == "edit") {
      setAddTodo(true);
      setupdateTodoObject(row);
      setUpdateTodo(true);
    }
    if (id == "delete") {
      //perform delete operation by passing _id #{row._id}
      let result = await postServiceCALLS("/usertodos/deletetodo", row);
      if (result.status) {
        toastMessage(result.message, "error");
        dispatch(GetUserTodos({}));
        //socket realted code START
        let action = getCacheObject(config.SESSION_KEY_NAME);
        action.action = `DELETE`;
        let socket = getSocketIOInstance();
        socket.emit("Todo", action, (error) => {
          if (error) {
            alert(error);
          }
        });
        // END
      }
    }
  };
  const user = getCacheObject(config.SESSION_KEY_NAME);
  const handleSearch = (e) => {
    const todos = globalSearch(
      userTodos && userTodos.status ? userTodos.data : [],
      e.target.value
    );
    setTodos(todos);
  };

  return (
    <>
      <div
        className={
          "MainContentWrapper page-wrapper default-theme sidebar-bg bg1 "
        }
      >
        {/* page-content  */}

        <SideBar />
        <div className="sectionContent  mbP5 ">
          <NavBar />

          <div className="content mt-10">
            <UserTodoModal
              updateTodoObject={updateTodoObject}
              onClose={() => {
                setAddTodo(false);
                dispatch(GetUserTodos({}));
              }}
              updateTodo={updateTodo}
              setUpdateTodo={(e) => setUpdateTodo(e)}
              open={addTodo}
            />
            {user.userRole[0].userRoleType === 1 ? <AdminCards /> : ""}

            <div className="row ">
              <div className="form-group col-md-12 mt-3">
                <Segment.Group>
                  <Segment className="table-headerbg">
                    <div className="flex" style={{ display: "flex" }}>
                      <div className="mt-1">
                        <h3>My Todo's</h3>
                      </div>
                      <div
                        className="pull-right col-md-3"
                        // style={{ "margin-inline-start": "auto" }}
                      >
                        <div className="flex">
                          {/* <h5 className="mt-2">Search:</h5> */}
                          <div className="col-md-12 search-border-radius">
                            <Input
                              className=""
                              onChange={handleSearch}
                              placeholder="search"
                              icon={true}
                              loading={false}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="pull-right"
                        style={{ "margin-inline-start": "auto" }}
                      >
                        <Button primary onClick={() => setAddTodo(true)}>
                          <i className="fa fa-plus" /> Add a Todo
                        </Button>
                      </div>
                    </div>
                  </Segment>
                  <Segment>
                    <TodoDataTable
                      data={todos}
                      columns={columns(handleActionsFromDataTable)}
                    />
                  </Segment>
                </Segment.Group>
              </div>
            </div>
          </div>
          <div className="content mt-10"></div>
        </div>
      </div>
    </>
  );
};


export default UserContent
