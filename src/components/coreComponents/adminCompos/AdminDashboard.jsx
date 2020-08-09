import React, { useState } from "react";
import { columns } from "./plugins/DataTableColumnConfiguration";
import Navbar from "../navs/navBar";
import SideBar from "../navs/sideBar";
import { Button, Segment } from "semantic-ui-react";
import AdminTodoDataTable from "./plugins/AdminTodoDataTable";
import Input from "../userComponents/userTodoModal/Input";

export const AdminDashboard = () => {
  const [searchString, setSearchString] = useState("");

  return (
    <>
      <div className="MainContentWrapper page-wrapper default-theme sidebar-bg bg1 ">
        {/* page-content  */}

        <SideBar />
        <div className="sectionContent  mbP5 ">
          <Navbar />

          <div className="content mt-10">
            <div className="row ">
              <div className="form-group col-md-12 mt-3">
                <Segment.Group>
                  <Segment>
                    <div className="flex col-md-12" style={{ display: "flex" }}>
                      <div className="col-md-9">
                        <div className="mt-1">
                          <h3>User's Todo's</h3>
                        </div>
                      </div>
                      <div
                        className="pull-right col-md-3"
                        style={{ "margin-inline-start": "auto" }}
                      >
                        <div className="flex">
                          <h5 className="mt-2">Search:</h5>
                          <div className="col-md-12">
                            <Input
                              onChange={(e) => setSearchString(e.target.value)}
                              icon={true}
                              loading={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Segment>
                  <Segment>
                    <AdminTodoDataTable
                      searchString={searchString}
                      columns={columns}
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
export default AdminDashboard;
