"use client";
import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import AddNewStudent from "./AddNewStudent";
import { Search, Trash } from "lucide-react";
import { Button } from "../../components/ui/button";
const pagination = true;
const paginationPageSize = 20;
const paginationPageSizeSelector = [20, 100, 500];
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import axios from "axios";

const StudentList = ({ Studentlist, fetchStudentList, setStudentlist }) => {
  const HandleDelete = async (id) => {
    //await axios.delete(`/api/student?${id}`)
    fetchStudentList();
  };
  const customButton = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button size="sm">
            <Trash></Trash>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => HandleDelete(props.data.ID)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  const [colDefs, setColDefs] = useState([
    { field: "STUDENT_ID", filter: true },
    { field: "NAME", filter: true },
    { field: "ADDRESS", filter: true },
    { field: "GRADE", filter: true },
    { field: "PHONENUMBER", filter: true },
    { field: "ACTION", cellRenderer: customButton },
  ]);
  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState();
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
              setStudentlist={setStudentlist}
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
