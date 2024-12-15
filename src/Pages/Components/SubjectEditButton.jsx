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
const API=process.env.REACT_APP_API_URL
const SubjectEditButton = ({ data, fetchSubjectList }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const HandleEdit = async (Valuedata, id) => {
    try {
      console.log(Valuedata, id);
      const response = await axios.put(
        `${API}/api/v1/Admin/EditSubject/${id}`,
        {
          name: Valuedata.name,
          email: Valuedata.email,
          password: Valuedata.password,
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
        fetchSubjectList();
        reset();
        setOpen(false);
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Error in edting subject:");
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
          <DialogTitle className="text-center">Edit Teacher</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((value) => HandleEdit(value, data.SUBJECT_ID))}
        >
          <div className="flex-col py-3">
            <label htmlFor="fullname" className="text-right">
              Full name
            </label>
            <Input
              id="fullname"
              placeholder="Enter Full name"
              className="col-span-3"
              defaultValue={data.name}
              {...register("name", { required: true })}
            />
          </div>
          <div className="flex-col py-3">
            <label htmlFor="email" className="text-right">
              email
            </label>
            <Input
              id="email"
              placeholder="Enter email"
              className="col-span-3"
              defaultValue={data.email}
              {...register("email", { required: true })}
            />
          </div>
          <div className="flex-col py-3">
            <label htmlFor="password" className="text-right">
              password
            </label>
            <Input
              id="password"
              placeholder="Enter password"
              className="col-span-3"
              defaultValue={data.password}
              {...register("password", { required: true })}
            />
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

export default SubjectEditButton;
