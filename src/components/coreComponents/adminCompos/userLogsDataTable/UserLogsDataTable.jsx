import DataTable, { createTheme } from "react-data-table-component";
import { customStyles } from "../../plugins/CustomCssForDataTable"; /// ikada inputs lev ga antuna?lev
import React, { useEffect } from "react";
import {
  adminUserAction,
  userLogsAction,
} from "../../../Redux/adminActions/admin.actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { globalSearch } from "../../../tools/helpers";
const UserLogsDataTable = (props) => {
  const [state, setstate] = useState([]);
  const dispatch = useDispatch();
  let  broadCastUpdates=useSelector((state=>state.userTodos.broadCastUpdates))
  let  userLogs=useSelector((state=>state.adminReducers.userLogs))
 
  
  useEffect(() => {
    if (userLogs) {
      setstate(userLogs);
    }
  }, [userLogs]);

  useEffect(() => {
    dispatch(userLogsAction());
  }, [broadCastUpdates, dispatch]);

  useEffect(() => {
    setstate(
      globalSearch(userLogs ? userLogs : [], props.searchString)
    );
  }, [props.searchString]);

  return (
    <React.Fragment>
      <DataTable
        defaultSortField="dateCreated"
        defaultSortAsc={false}
        persistTableHead
        fixedHeader={props.fixedHeader ? props.fixedHeader : false}
        title={props.tableHeader ? props.tableHeader : "Todo's"}
        columns={props.columns ? props.columns : []}
        data={state}
        pagination={props.pagination ? props.pagination : true}
        customStyles={customStyles}
        noHeader={true}
        striped={true}
      />
    </React.Fragment>
  );
};
export default UserLogsDataTable;
