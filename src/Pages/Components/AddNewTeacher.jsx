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

const AddNewStudent = ({ fetchStudentList }) => {
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
      //await axios.post("/api/student", data);
      fetchStudentList(); 
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  useEffect(() => {
    const getGrades = async () => {
      try {
        const response = await axios.get("/api/grade");
        const gradeData = response.data; 
        setGrades(gradeData.data || []);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    };
    getGrades();
  }, []);

  return (
    <div className="" >
      <Button onClick={() => setOpen(true)} className="hover:text-white">+ Add New Teacher</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold">Add New Teacher</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex-col py-3">
                  <label htmlFor="name" className="text-right">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter Teacher Name"
                    className="col-span-3"
                    {...register("NAME", { required: true })}
                  />
                </div>
                <div className="flex-col py-3">
                  <label htmlFor="contact" className="text-right">
                    Email
                  </label>
                  <Input
                    type="number"
                    id="contact"
                    placeholder="Enter Email"
                    className="col-span-3"
                    {...register("EMAIL", { required: true })}
                  />
                </div>
                <div className="flex-col py-3">
                  <label htmlFor="address" className="text-right">
                    Password
                  </label>
                  <Input
                    id="address"
                    placeholder="Enter Password"
                    className="col-span-3"
                    {...register("PASSWORD", { required: true })}
                  />
                </div>
                <div className="py-3 flex justify-end gap-3">
                  <Button onClick={() => setOpen(false)} variant="black">Cancel</Button>
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
