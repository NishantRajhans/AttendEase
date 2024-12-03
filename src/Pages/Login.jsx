import * as React from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const submitHandler = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/${data.ROLE}/SignIn`,
        {
          EMAIL: data.EMAIL,
          PASSWORD: data.PASSWORD,
          ROLE: data.ROLE,
        }
      );
      console.log(response.data.user);
      if (response.data.success === true) {
        localStorage.setItem("UserId", response.data.user.USER_ID);
        localStorage.setItem("UserName", response.data.user.NAME);
        localStorage.setItem("UserEmail", response.data.user.EMAIL);
        localStorage.setItem("Token", response.data.token);
        localStorage.setItem("Role", response.data.role);
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding student:");
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <Card className="w-[350px] shadow-lg shadow-yellow-400">
        <CardHeader>
          <CardTitle className="mx-auto font-bold">LogIn Form</CardTitle>
          <CardDescription className="mx-auto">
            Access your account by entering your email and password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter Your Email"
                  {...register("EMAIL", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter Your Password"
                  {...register("PASSWORD", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Role</Label>
                <Select onValueChange={(value) => setValue("ROLE", value)}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full font-bold hover:text-white"
                type="submit"
              >
                LogIn
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
