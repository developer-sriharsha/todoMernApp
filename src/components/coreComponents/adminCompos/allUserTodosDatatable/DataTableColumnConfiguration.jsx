import memoize from "memoize-one";
import React from "react";
import moment from "moment";
export const columns = [
  {
    name: "Todo Title",
    selector: "todoTitle",
    sortable: true,
    width: "20%",
    wrap: true,
  },
  {
    name: "Description",
    selector: "todoDescription",
    sortable: true,
    width: "30%",
    wrap: true,
  },
  {
    name: "Priority",
    selector: "todoPriority",
    width: "10%",
    sortable: true,
    format: (row) =>
      row.todoPriority == 1 ? "High" : row.todoPriority == 2 ? "Medium" : "Low",
  },
  {
    name: "Status",
    selector: "todoStatus",
    sortable: true,
    width: "10%",
    format: (row) => (row.todoStatus == 1 ? "Active" : "Completed"),
  },
  {
    name: "Created By",
    selector: (row) =>  row["user"].length>0?row["user"][0].firstName + " " + row["user"][0].lastName:"",
    sortable: true,
    width: "15%",
  },
  {
    name: "Date Added",
    selector: "createdDate",
    sortable: true,
    width: "15%",
    format: (row) => moment(row.createdDate).format("lll"),
  },
];
