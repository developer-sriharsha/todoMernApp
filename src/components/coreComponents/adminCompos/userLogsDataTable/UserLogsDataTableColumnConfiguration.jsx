import memoize from "memoize-one";
import React from "react";
import moment from "moment";
import { Menu, Dropdown, Button } from "semantic-ui-react";

export const columns = [
  {
    name: "Todo Title",
    selector: (row) => (row["todo"].length>0 ? row["todo"][0].todoTitle : ""),
    sortable: true,
    wrap: true,
  },
  {
    name: "Todo Status",
    selector: "action",
    sortable: true,
  },
  {
    name: "Performed By",
    selector: (row) => row["user"].length>0?row["user"][0].firstName + " " + row["user"][0].lastName:"",
    sortable: true,
  },
  {
    name: "Date Performed",
    selector: "dateCreated",
    sortable: true,
    format: (row) => moment(row.dateCreated).format("lll"),
  },
];
