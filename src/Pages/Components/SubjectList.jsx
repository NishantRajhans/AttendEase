"use client";
import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import AddNewSubject from "./AddNewSubject";
import { Search } from "lucide-react";
import SubjectEditButton from "./SubjectEditButton";
import SubjectDeleteButton from "./SubjectDeleteButton";
const pagination = true;
const paginationPageSize = 20;
const paginationPageSizeSelector = [20, 100, 500];
const SubjectList = ({
  Subjectslist,
  fetchSubjectList,
  Teacherslist,
  setSubjectslist,
  grades,
}) => {
  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [colDefs, setColDefs] = useState([]);
  useEffect(() => {
    setColDefs([
      { field: "subject", filter: true, width: "250%" },
      { field: "grade", filter: true, width: "250%" },
      { field: "teacher", filter: true, width: "250%" },
      {
        field: "edit",
        cellRenderer: (params) => (
          <SubjectEditButton
            data={params}
            fetchSubjectList={fetchSubjectList}
          ></SubjectEditButton>
        ),
        width: "200%",
      },
      {
        field: "delete",
        cellRenderer: (params) => (
          <SubjectDeleteButton
            data={params}
            fetchSubjectList={fetchSubjectList}
          ></SubjectDeleteButton>
        ),
        width: "200%",
      },
    ]);
  },[fetchSubjectList]);
  useEffect(() => {
    setRowData(Subjectslist);
  }, [Subjectslist]);
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
            <AddNewSubject
              fetchSubjectList={fetchSubjectList}
              Teacherslist={Teacherslist}
              grades={grades}
              setSubjectslist={setSubjectslist}
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

export default SubjectList;
