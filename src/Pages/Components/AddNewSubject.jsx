"use client";
import React, { useState} from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const AddNewStudent = ({ fetchSubjectList, Teacherslist, grades }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/Admin/AddSubject",
        {
          GRADE_ID: data.GRADE_ID,
          SUBJECT_NAME: data.SUBJECT_NAME,
          TEACHER_ID: data.TEACHER_ID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      );
      if (response.data.success == true) {
        toast.success(response.data.message)
        fetchSubjectList();
        reset();
        setOpen(false);
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Error adding new subject:");
    }
  };
  return (
    <div className="">
      <Button onClick={() => setOpen(true)} className="hover:text-white">
        + Add New Subject
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold">Add New Subject</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex-col py-3">
                  <label htmlFor="name" className="text-right">
                    Subject Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter Subject Name"
                    className="col-span-3"
                    {...register("SUBJECT_NAME", { required: true })}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label>Select Teacher</label>
                  <select
                    className="w-full h-10 border rounded-md"
                    {...register("TEACHER_ID", { required: true })}
                  >
                    {Teacherslist?.map((teacher, index) => (
                      <option
                        key={index}
                        value={teacher.TEACHER_ID}
                        className="text-black"
                      >
                        {teacher.NAME}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col py-2">
                  <label>Select Grade</label>
                  <select
                    className="w-full h-10 border rounded-md"
                    {...register("GRADE_ID", { required: true })}
                  >
                    {grades?.map((grade, index) => (
                      <option
                        key={index}
                        value={grade.GRADE_ID}
                        className="text-black"
                      >
                        {grade.GRADE_NAME}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="py-3 flex justify-end gap-3">
                  <Button onClick={() => setOpen(false)} variant="black">
                    Cancel
                  </Button>
                  <Button type="submit">Add</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStudent;
