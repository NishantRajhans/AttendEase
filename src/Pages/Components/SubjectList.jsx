"use client";
import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import AddNewSubject from "./AddNewSubject";
import { Pencil, Search, Trash } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../components/ui/dialog";

import axios from "axios";
const SubjectList = ({ Subjectslist, fetchSubjectsList, setSubjectslist, Teacherslist }) => {
  const HandleDelete = async (id) => {
    //await axios.delete(`/api/Subject?${id}`)
    fetchSubjectsList();
  };
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    setRowData(Subjectslist);
  }, [Subjectslist]);

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

  const editButton = (props) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Pencil></Pencil>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
            <DialogDescription>
              Make changes to Subject. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col py-2">
            <label>Select Teacher</label>
            <select
              className="w-full h-10 border rounded-md"
              {...register("TEACHER_ID", { required: true })}
            >
              {Teacherslist?.length > 0 ? (
                Teacherslist.map((teacher, index) => (
                  <option key={index} value={teacher.TEACHER_ID} className="text-black">
                    {teacher.NAME}
                  </option>
                ))
              ) : (
                <option>Loading...</option>
              )}
            </select>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const [colDefs, setColDefs] = useState([
    { field: "SUBJECT", filter: true, width: "250%" },
    { field: "GRADE", filter: true, width: "250%" },
    { field: "TEACHER", filter: true, width: "250%" },
    { field: "EDIT", cellRenderer: editButton, width: "200%" },
    { field: "DELETE", cellRenderer: customButton, width: "200%" },
  ]);

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
              fetchSubjectsList={fetchSubjectsList}
              setSubjectslist={setSubjectslist}
              Teacherslist={Teacherslist}
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

