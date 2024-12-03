"use client";
import React, { useState } from "react";
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
const AddNewStudent = ({ fetchTeacherList, setTeacherlist }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const HandleSubmit = async (data, id) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/Admin/AddTeacher`,
        {
          NAME: data.NAME,
          EMAIL: data.EMAIL,
          PASSWORD: data.PASSWORD,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      );
      if (response.data.success === true) {
        toast.success(response.data.message);
        fetchTeacherList();
        reset();
        setOpen(false);
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Error adding new teacher:");
    }
  };
  return (
    <div className="">
      <Button onClick={() => setOpen(true)} className="hover:text-white">
        + Add New Teacher
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold">Add New Teacher</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(HandleSubmit)}>
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
                  <label htmlFor="email" className="text-right">
                    Email
                  </label>
                  <Input
                    id="email"
                    placeholder="Enter Email"
                    className="col-span-3"
                    {...register("EMAIL", { required: true })}
                  />
                </div>
                <div className="flex-col py-3">
                  <label htmlFor="password" className="text-right">
                    Password
                  </label>
                  <Input
                    id="password"
                    placeholder="Enter Password"
                    className="col-span-3"
                    {...register("PASSWORD", { required: true })}
                  />
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
