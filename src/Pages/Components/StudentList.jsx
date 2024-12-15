"use client";
import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import AddNewStudent from "./AddNewStudent";
import { Search} from "lucide-react";
import EditButton from "./StudentEditButton";
import DeleteButton from "./StudentDeleteButton";
const pagination = true;
const paginationPageSize = 20;
const paginationPageSizeSelector = [20, 100, 500];
const StudentList = ({ Studentlist,fetchStudentList,grades}) => {
  const [colDefs, setColDefs] = useState();  
  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState();
  useEffect(() => {
    if (grades && grades.length > 0) {
      setColDefs([
        { field: "studentId",headername: "StudentId", filter: true },
        { field: "name",headername: "Name", filter: true },
        { field: "address",headername: "Address", filter: true },
        { field: "grade",headername: "Grade", filter: true },
        { field: "phoneNumber",headername: "PhoneNumber", filter: true },
        {
          field: "edit",
          cellRenderer: (params) => (
            <EditButton
              grades={grades}
              data={params.data}
              fetchStudentList={fetchStudentList}
            />
          ),
          width: "200%",
        },
        {
          field: "delete",
          cellRenderer: (params) => (
            <DeleteButton
              fetchStudentList={fetchStudentList}
              data={params.data}
            />
          ),
          width: "200%",
        },
      ]);
    }
  }, [grades,fetchStudentList]);
  useEffect(() => {
    setRowData(Studentlist);
  }, [Studentlist]);
  return (
    <div className="my-7 p-6">
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <div>
          <div className="p-2 flex justify-between rounded-lg shadow-sm w-[95%] mx-auto">
          <div className="p-2 border rounded-lg flex gap-2 mb-4 w-[50%] shadow-sm">
            <Search />
            <input
              id="name"
              type="text"
              placeholder="Enter Anything..."
              className="outline-none w-full"
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>
            <AddNewStudent
              fetchStudentList={fetchStudentList}
              grades={grades}
            />
          </div>
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination}
          quickFilterText={searchInput}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};

export default StudentList;
