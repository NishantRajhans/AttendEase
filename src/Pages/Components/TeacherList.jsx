"use client";
import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import AddNewTeacher from "./AddNewTeacher";
import { Search, Trash, Pencil } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../components/ui/dialog";
import { useForm } from "react-hook-form";
import axios from "axios";
import TeacherEditButton from "./TeacherEditButton";
import TeacherDeleteButton from "./TeacherDeleteButton";
const pagination = true;
const paginationPageSize = 20;
const paginationPageSizeSelector = [20, 100, 500];

const TeacherList = ({ Teacherslist, fetchTeacherList, setTeacherlist }) => {
  const [colDefs, setColDefs] = useState([
    { field: "TEACHER_ID", filter: true },
    { field: "NAME", filter: true },
    { field: "EMAIL", filter: true },
    { field: "PASSWORD", filter: true },
    {
      field: "EDIT",
      cellRenderer: (params) => (
        <TeacherEditButton
          data={params.data}
          fetchTeacherList={fetchTeacherList}
        ></TeacherEditButton>
      ),
      width: "200%",
    },
    {
      field: "DELETE",
      cellRenderer: (params) => (
        <TeacherDeleteButton
          data={params.data}
          fetchTeacherList={fetchTeacherList}
        ></TeacherDeleteButton>
      ),
      width: "200%",
    },
  ]);
  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState();
  useEffect(() => {
    setRowData(Teacherslist);
  }, [Teacherslist]);
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
            <AddNewTeacher
              fetchTeacherList={fetchTeacherList}
              setTeacherlist={setTeacherlist}
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

export default TeacherList;