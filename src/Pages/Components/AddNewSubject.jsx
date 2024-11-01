"use client";
import React, { useState, useEffect } from "react";
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

const AddNewStudent = ({ fetchStudentList ,Teacherslist}) => {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      // await axios.post("/api/student", data);
      fetchStudentList();
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  const getGrades = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/Admin/GetAllGrade");
      const gradeData = response.data;
      setGrades(gradeData.response || []);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };
  useEffect(() => {
    getGrades();
  }, []);

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
                      <option key={index} value={teacher.TEACHER_ID} className="text-black">
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
                      <option key={index} value={grade.GRADE_ID} className="text-black">
                        {grade.GRADE_NAME}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="py-3 flex justify-end gap-3">
                  <Button onClick={() => setOpen(false)} variant="black">
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
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
