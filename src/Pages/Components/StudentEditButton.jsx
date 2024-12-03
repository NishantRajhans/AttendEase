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
import { toast } from "react-toastify";
const EditButton = ({ data, fetchStudentList, grades }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const HandleEdit = async (dataValue, id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/Admin/EditStudent/${id}`,
        {
          NAME: dataValue.NAME,
          EMAIL: dataValue.EMAIL,
          PASSWORD: dataValue.PASSWORD,
          PHONENUMBER: dataValue.PHONENUMBER,
          ADDRESS: dataValue.ADDRESS,
          GRADE: dataValue.GRADE,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      );
      if (response.data.success == true) {
        toast.success(response.data.message);
        fetchStudentList();
        reset();
        setOpen(false);
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Error in editing student:");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} size="sm">
          <Edit3Icon></Edit3Icon>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] sm:max-h-[97%]">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Student</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((value) => {
            HandleEdit(value, data.STUDENT_ID);
            console.log(data);
          })}
        >
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
            <label htmlFor="contact" className="text-right">
              Contact Number
            </label>
            <Input
              type="number"
              id="contact"
              placeholder="Enter Contact Number"
              className="col-span-3"
              defaultValue={data.PHONENUMBER}
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
          <div className="flex-col py-3">
            <label htmlFor="address" className="text-right">
              Address
            </label>
            <Input
              id="address"
              placeholder="Enter Address"
              className="col-span-3"
              defaultValue={data.ADDRESS}
              {...register("ADDRESS", { required: true })}
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="grade">Select Grade</label>
            <select
              className="w-full h-10 border rounded-md"
              id="grade"
              defaultValue={data.GRADE}
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
            <Button type="submit">Edit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
