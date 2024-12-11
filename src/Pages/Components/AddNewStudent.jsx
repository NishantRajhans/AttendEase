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

const AddNewStudent = ({ fetchStudentList, grades }) => {
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
        "https://attendease-backend-cski.onrender.com/api/v1/Admin/AddStudent",
        {
          NAME: data.NAME,
          EMAIL: data.EMAIL,
          PASSWORD: data.PASSWORD,
          PHONENUMBER: data.PHONENUMBER,
          ADDRESS: data.ADDRESS,
          GRADE: data.GRADE,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      );
      console.log(response)
      if (response.data.success === true) {
        toast.success(response.data.message);
        fetchStudentList();
        reset();
        setOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding new student:");
    }
  };
  return (
    <div className="">
      <Button onClick={() => setOpen(true)} className="hover:text-white">
        + Add New Student
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold">Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex-col py-3">
                  <label htmlFor="fullname" className="text-right">
                    Full Name
                  </label>
                  <Input
                    id="fullname"
                    placeholder="Enter Full Name"
                    className="col-span-3"
                    {...register("NAME", { required: true })}
                  />
                </div>
                <div className="flex-col py-3">
                  <label htmlFor="contact" className="text-right">
                    Contact Number
                  </label>
                  <Input
                    type="number"
                    id="contact"
                    placeholder="Enter Contact Number"
                    className="col-span-3"
                    {...register("PHONENUMBER", { required: true })}
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
                    id="passowrd"
                    placeholder="Enter Password"
                    className="col-span-3"
                    {...register("PASSWORD", { required: true })}
                  />
                </div>
                <div className="flex-col py-3">
                  <label htmlFor="address" className="text-right">
                    Address
                  </label>
                  <Input
                    id="address"
                    placeholder="Enter Address"
                    className="col-span-3"
                    {...register("ADDRESS", { required: true })}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label>Select Grade</label>
                  <select
                    className="w-full h-10 border rounded-md"
                    {...register("GRADE", { required: true })}
                  >
                    {grades?.map((grade, index) => (
                      <option
                        key={index}
                        value={grade.GRADE_NAME}
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
