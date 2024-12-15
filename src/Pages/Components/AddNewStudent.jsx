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
const API=process.env.REACT_APP_API_URL
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
        `${API}/api/v1/Admin/AddStudent`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
          address: data.address,
          grade: data.grade,
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
                    placeholder="Enter Full name"
                    className="col-span-3"
                    {...register("name", { required: true })}
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
                    {...register("phoneNumber", { required: true })}
                  />
                </div>
                <div className="flex-col py-3">
                  <label htmlFor="email" className="text-right">
                    Email
                  </label>
                  <Input
                    id="email"
                    placeholder="Enter email"
                    className="col-span-3"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="flex-col py-3">
                  <label htmlFor="password" className="text-right">
                    Password
                  </label>
                  <Input
                    id="passowrd"
                    placeholder="Enter password"
                    className="col-span-3"
                    {...register("password", { required: true })}
                  />
                </div>
                <div className="flex-col py-3">
                  <label htmlFor="address" className="text-right">
                    Address
                  </label>
                  <Input
                    id="address"
                    placeholder="Enter address"
                    className="col-span-3"
                    {...register("address", { required: true })}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label>Select grade</label>
                  <select
                    className="w-full h-10 border rounded-md"
                    {...register("grade", { required: true })}
                  >
                    {grades?.map((grade, index) => (
                      <option
                        key={index}
                        value={grade.gradeId}
                        className="text-black"
                      >
                        {grade.gradeName}
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
