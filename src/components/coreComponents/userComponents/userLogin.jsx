import React, { useReducer, useState } from "react";
import loginUserRequest from "../../Redux/userActions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  checkSession,
  validateForm,
} from "../../tools/helpers";
import { intiateUserSocketConnection } from "../SocketIO";
const UserLogin = () => {
 
  const [user, setUser] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      password: "",
      userName: "",
    }
  );


  const [errors, setErrors] = useState({});
  const loginedUser = useSelector((state) => state.user.loginedUser);
  let dispatch = useDispatch();
  const handleUser = (e, name) => {
    let value = e.target.value;
    setUser({ [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let validationFields = {
      password: "",
      userName: "",
    };

    let validateFormResults = validateForm(user, validationFields);
    setErrors(validateFormResults.errors);
    if (!validateFormResults.formIsValid) {
      return false;
    }
    if (user.password !== "" && user.userName !== "") {
      dispatch(loginUserRequest(user));
    }
  };

  if (checkSession()) {
    intiateUserSocketConnection();
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <div>
        <div className="container">
          <div className="">
            <div className="">
              <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header pad0">
                  <h3 className="text-center font-weight-bold my-4">Login</h3>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label className="large  mb-1" htmlFor="inputEmailAddress">
                        Username
                      </label>
                      <input
                        onChange={(e) => handleUser(e, "userName")}
                        className={`form-control py-4 ${
                          errors.userName ? "invalid-field" : ""
                        }`}
                        id="inputEmailAddress"
                        type="text"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="form-group">
                      <label className="large  mb-1" htmlFor="inputPassword">
                        Password
                      </label>
                      <input
                        onChange={(e) => handleUser(e, "password")}
                        className={`form-control py-4 ${
                          errors.password ? "invalid-field" : ""
                        }`}
                        id="inputPassword"
                        type="password"
                        placeholder="Enter password"
                      />
                    </div>
                    {loginedUser == "fail" ? (
                      <div>
                        <h5 className="text-danger pad10">
                          Username or password is invalid!
                        </h5>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="rememberPasswordCheck"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="rememberPasswordCheck"
                        >
                          Remember password
                        </label>
                      </div>
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-center mt-4 mb-0">
                      
                      <Link
                        onClick={handleSubmit}
                        className="btn btn-primary active"
                        to="/"
                      >
                        {" "}
                        Login
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center">
                  <div className="large">
                    {" "}
                    <Link to="/signup"> Need an account? Sign up!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin; // this connect is a hoc component

// first parameter is getting state calback, second is setting state call back
// third we have to pass whole current component
// which attached to the root reducer objectok
