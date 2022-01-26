import memoize from "memoize-one";
import React from "react";
import moment from "moment";
export const columns = memoize((clickHandler) => [
  {
    name: "Todo Title",
    selector: "todoTitle",
    sortable: true,
  },
  {
    name: "Description",
    selector: "todoDescription",
    sortable: true,
  },
  {
    name: "Priority",
    selector: "todoPriority",
    sortable: true,
    format: (row) =>
      row.todoPriority == 1 ? "High" : row.todoPriority == 2 ? "Medium" : "Low",
    width: "10%",
  },
  {
    name: "Status",
    selector: "todoStatus",
    sortable: true,
    format: (row) => (row.todoStatus == 1 ? "Active" : "Completed"),
    width: "10%",
  },

  {
    name: "Date Added",
    selector: "createdDate",
    sortable: true,
    width: "16%",
    format: (row) => moment(row.createdDate).format("lll"),
  },
  {
    cell: (row) => (
      <div className="table-actions">
        <a className="mr-3" style={{ cursor: "pointer" }}>
          <i
            class="fas fa-edit"
            id="edit"
            onClick={(e) => clickHandler(e, row)}
          ></i>
        </a>
        <a className="mr" style={{ cursor: "pointer" }}>
          <i
            class="fas fa-trash"
            onClick={(e) => clickHandler(e, row)}
            id="delete"
            aria-hidden="true"
          ></i>
        </a>
      </div>
    ),
    width: "10%",
    name: "Actions",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
]);
