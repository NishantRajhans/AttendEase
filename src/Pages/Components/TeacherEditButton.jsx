import React, { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Edit3Icon } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { useForm } from "react-hook-form";
import axios from "axios";
const TeacherEditButton = ({data,fetchTeacherList}) => {
    const [open,setOpen]=useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    const HandleEdit = async (data, id) => {
        try {
            const Teacher=await axios.put(`http://localhost:4000/api/v1/Admin/EditTeacher/${id}`,{
              NAME:data.NAME,
              EMAIL:data.EMAIL,
              PASSWORD:data.PASSWORD,
            },{
              headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("Token")
              }
            })
            fetchTeacherList(); 
            reset();
            setOpen(false);
          } catch (error) {
            console.error("Error adding student:", error);
          }
    };
    return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button onClick={() =>setOpen(true)} size="sm">
        <Edit3Icon></Edit3Icon>
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[550px] sm:max-h-[97%]">
      <DialogHeader>
        <DialogTitle className="text-center">Edit Teacher</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit((value) => HandleEdit(value, data.TEACHER_ID))}>
            <div className="flex-col py-3">
              <label htmlFor="fullname" className="text-right">
                Full Name
              </label>
              <Input
                id="fullname"
                placeholder="Enter Full Name"
                className="col-span-3"
                defaultValue={data.NAME}
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
                defaultValue={data.EMAIL}
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
                defaultValue={data.PASSWORD}
                {...register("PASSWORD", { required: true })}
              />
            </div>
            <div className="py-3 flex justify-end gap-3">
              <Button onClick={() => setOpen(false)} variant="black">Cancel</Button>
              <Button type="submit">Edit</Button>
            </div>
          </form>
    </DialogContent>
  </Dialog>
    )
}

export default TeacherEditButton
