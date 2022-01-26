import React from "react";
import { customStyles } from "./CustomCssForDataTable";
import DataTable, { createTheme } from "react-data-table-component";

const TodoDataTable = (props) => {
  
  return (
    <React.Fragment>
      <DataTable
        defaultSortField="createdDate"
        defaultSortAsc={false}
        persistTableHead
        fixedHeader={props.fixedHeader ? props.fixedHeader : false}
        title={props.tableHeader ? props.tableHeader : "Todo's"}
        columns={props.columns ? props.columns : []}
        data={props.data}
        pagination={props.pagination ? props.pagination : true}
        customStyles={customStyles}
        noHeader={true}
        striped={true}
      />
    </React.Fragment>
  );
};
export default TodoDataTable;
