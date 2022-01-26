import DataTable, { createTheme } from "react-data-table-component";
import { customStyles } from "../../plugins/CustomCssForDataTable"; /// ikada inputs lev ga antuna?lev
import React, { useEffect } from "react";
import { adminUserAction } from "../../../Redux/adminActions/admin.actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { globalSearch } from "../../../tools/helpers";

const UserManagementDataTable = (props) => {
  const [state, setstate] = useState([]);
  const dispatch = useDispatch();
  let  users=useSelector((state=>state.adminReducers.users))
  let  broadCastUpdates=useSelector((state=>state.userTodos.broadCastUpdates))
 
  useEffect(() => {
    if (users) {
      setstate(users);
    }
  }, [users]);

  useEffect(() => {
    dispatch(adminUserAction());
  }, [broadCastUpdates, dispatch]);

  useEffect(() => {
    setstate(globalSearch(users ? users : [], props.searchString));
  }, [props.searchString]);

  return (
    <React.Fragment>
      <DataTable
        defaultSortField="createdDate"
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
export default UserManagementDataTable;
