import DataTable, { createTheme } from "react-data-table-component";
import { customStyles } from "../../plugins/CustomCssForDataTable"; /// ikada inputs lev ga antuna?lev
import React, { useEffect } from "react";
import adminTodosAction from "../../../Redux/adminActions/admin.actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { globalSearch } from "../../../tools/helpers";

const AdminTodoDataTable = (props) => {
  const [state, setstate] = useState([]);
  const dispatch = useDispatch();
 let  adminTodos=useSelector((state=> state.adminReducers.adminTodos))
 let  broadCastUpdates=useSelector((state=>state.userTodos.broadCastUpdates))

 
  useEffect(() => {
    if (adminTodos) {
      setstate(adminTodos);
    }
  }, [adminTodos]);

  useEffect(() => {
    dispatch(adminTodosAction());
  }, [broadCastUpdates]);

  useEffect(() => {
    setstate(
      globalSearch(adminTodos ? adminTodos : [], props.searchString)
    );
  }, [ props.searchString]);

  useEffect(() => {
    dispatch(adminTodosAction());
  }, []);
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

export default AdminTodoDataTable
