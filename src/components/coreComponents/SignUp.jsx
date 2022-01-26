import { Link } from "react-router-dom";
import { validateForm } from "../tools/helpers";

import React, { useReducer, useState } from "react";
import { signUpUserRequest } from "../Redux/userActions/user.action";
import { useDispatch, useSelector } from "react-redux";
import RegisterSuccessModal from "./userComponents/registerSuccessModal";

const SignUp = () => {
  const [user, setUser] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      userName: "",
      confirmPassword: "",
    }
  );
  const [errors, setErrors] = useState({});
  let dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationFields = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      userName: "",
      confirmPassword: "",
    };

    let validateFormResults = validateForm(user, validationFields);
    setErrors(validateFormResults.errors);
    if (!validateFormResults.formIsValid) {
      return false;
    }
 
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
         setErrors({email: "invalid",});
          return false;
        }
    if (user.password != user.confirmPassword) {
      setErrors({
        password: "invalid",
        confirmPassword: "invalid",
      });
      return false;
    }
    if (validateFormResults.formIsValid) {
      dispatch(signUpUserRequest(user));
    }
  };
  const handleChange = (e, name) => {
    let value = e.target.value;
    setUser({ [name]: value });
  };

  return (
    <div>
      <RegisterSuccessModal />
      <div className="welomePage">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header pad0">
                  <h3 className="text-center font-weight-bold my-4">
                    Create Account
                  </h3>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="large mb-1"
                            htmlFor="inputFirstName"
                          >
                            First Name
                          </label>
                          <input
                            onChange={(e) => handleChange(e, "firstName")}
                            className={`form-control py-4 ${
                              errors.firstName ? "invalid-field" : ""
                            }`}
                            id="inputFirstName"
                            type="text"
                            placeholder="Enter first name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="large mb-1" htmlFor="inputLastName">
                            Last Name
                          </label>
                          <input
                            className="form-control py-4"
                            onChange={(e) => handleChange(e, "lastName")}
                            className={`form-control py-4 ${
                              errors.lastName ? "invalid-field" : ""
                            }`}
                            id="inputLastName"
                            type="text"
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="large mb-1" htmlFor="inputEmailAddress">
                        Email
                      </label>
                      <input
                        className="form-control py-4"
                        onChange={(e) => handleChange(e, "email")}
                        className={`form-control py-4 ${
                          errors.email ? "invalid-field" : ""
                        }`}
                        id="inputEmailAddress"
                        type="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="form-group">
                      <label className="large mb-1" htmlFor="inputEmailAddress">
                        Username
                      </label>
                      <input
                        className="form-control py-4"
                        onChange={(e) => handleChange(e, "userName")}
                        className={`form-control py-4 ${
                          errors.userName ? "invalid-field" : ""
                        }`}
                        id="inputEmailAddress"
                        type="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter  Username"
                      />
                    </div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="large mb-1" htmlFor="inputPassword">
                            Password
                          </label>
                          <input
                            className="form-control py-4"
                            id="inputPassword"
                            onChange={(e) => handleChange(e, "password")}
                            className={`form-control py-4 ${
                              errors.password ? "invalid-field" : ""
                            }`}
                            type="password"
                            placeholder="Enter password"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="large mb-1"
                            htmlFor="inputConfirmPassword"
                          >
                            Confirm Password
                          </label>
                          <input
                            className="form-control py-4"
                            id="inputConfirmPassword"
                            onChange={(e) => handleChange(e, "confirmPassword")}
                            className={`form-control py-4 ${
                              errors.confirmPassword ? "invalid-field" : ""
                            }`}
                            type="password"
                            placeholder="Confirm password"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="large mb-1"
                            htmlFor="inputConfirmPassword"
                          >
                            Phone
                          </label>
                          <input
                            className="form-control py-4"
                            maxLength={10}
                            id="inputConfirmPassword"
                            onChange={(e) => handleChange(e, "phone")}
                            className={`form-control py-4 ${
                              errors.phone ? "invalid-field" : ""
                            }`}
                            type="text"
                            placeholder="phone"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group mt-4 mb-0">
                      <a
                        className="btn btn-primary btn-block"
                        onClick={handleSubmit}
                        href="login.html"
                      >
                        Create Account
                      </a>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center">
                  <div className="large">
                    <Link to="/"> Have an account? Go to login</Link>
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

export default SignUp;
