import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { JQuery, getCacheObject } from "../../tools/helpers";
import moment from "moment";
import { userLogsAction } from "../../Redux/adminActions/admin.actions";
import config from "../../tools/config";
const NavBar = (props) => {
  const dispatch = useDispatch();

  const user = getCacheObject(config.SESSION_KEY_NAME);

  useEffect(() => {
    JQuery();
  }, []);
  const userLogs = useSelector((state) => state.adminReducers.userLogs);
  const broadCastUpdates = useSelector((state) => state.userTodos.broadCastUpdates);
  useEffect(() => {
    dispatch(userLogsAction());
  }, [broadCastUpdates]);
  return (
    <>
      <div className="navbarFixed">
        <nav class="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
          <div
            id="toggle-sidebar"
            className="cursor-Pointer toggleMenuBar btn btn-secondary rounded-0 nav-icon1"
          >
            <div className="MenuPointer">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="headTitle">Todo's</div>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto align-items-center fs-14">
              <li class="nav-item active">
                <Link className="nav-link" to="/dashboard">
                  <i class="fa fa-home fs-18"></i>
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
            {user.userRole[0].userRoleType === 1 ? (
              <ul class="navbar-nav bellIcon  fs-14">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <div className="icons">
                      <div
                        className="notification"
                      >
                        <a href="#"></a>
                        <div className="notBtn" href="#">
                          <a href="#">
                            <div className="number">
                              {userLogs ? userLogs.length : "0"}
                            </div>
                            <i className="fas fa-bell bellIcon2" />
                          </a>
                          <div className="box">
                            <a href="#"></a>
                            <div className="">
                              {userLogs &&userLogs.length>0
                                ? userLogs.map((item, index) => {
                                    return (
                                      <>
                                        <div key={index} className="">
                                          
                                          <div className="sec new">
                                            <div className="txt">
                                              {item.user.length>0?item.user[0].firstName:""}:
                                              {item.action}
                                            </div>
                                            <div className="txt sub">
                                              {moment(item.dateCreated).format(
                                                "lll"
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })
                                : <div  className="">
                               
                                <div className="sec new">
                                  <div className="txt">
                                   No user logs.
                                  </div>
                                  <div className="txt sub">
                                   
                                  </div>
                                </div>
                              </div>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            ) : null}
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
