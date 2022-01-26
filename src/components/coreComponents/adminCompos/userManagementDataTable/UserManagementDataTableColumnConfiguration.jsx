import memoize from "memoize-one";
import React from "react";
import moment from "moment";
import {  Button } from "semantic-ui-react";


export const columns = memoize((clickHandler) => [
  {
    name: "First Name",
    selector: "firstName",
    sortable: true,
  },
  {
    name: "Last Name",
    selector: "lastName",
    sortable: true,
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
  },
  {
    name: "Phone",
    selector: "phone",
    sortable: true,
  },
  
  {
    name: "Date Added",
    selector: "createdDate",
    sortable: true,
    format: (row) => moment(row.createdDate).format("lll"),
  },
  {
    cell: (row) => (
      <div className="table-actions" style={{ width: "50%" }}>
        <Button.Group size="tiny">
          <Button  onClick={(e) => clickHandler(e, row)} style={{borderRadius:"5px 0px 0px 5px"}} color={row.status === 1 && "green"} value={1}>Active</Button>
          <Button  onClick={(e) => clickHandler(e, row)} style={{borderRadius:"0px 5px 5px 0px"}} color={row.status === 0 && "red"} value={0}>Blocked</Button>
        </Button.Group>
      </div>
    ),
    name: "Status",
    ignoreRowClick: true,
    allowOverflow: true,
    center: false,
  },
]);
