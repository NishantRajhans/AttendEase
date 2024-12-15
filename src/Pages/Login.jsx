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
const API=process.env.REACT_APP_API_URL
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
        `${API}/api/v1/${data.role}/SignIn`,
        {
          email: data.email,
          password: data.password,
          role: data.role,
        }
      );
      if (response.data.success === true) {
        localStorage.setItem("UserName", response.data.user.name);
        localStorage.setItem("UserEmail", response.data.user.email);
        localStorage.setItem("Token", response.data.token);
        localStorage.setItem("Role", response.data.role);
        toast.success(response.data.message);
        if(response.data.role=="Admin")navigate("/Dashboard/Students");
        else if(response.data.role=="Teacher")navigate("/Dashboard");
        else navigate("/StudentDashboard")
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error in LogIn");
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
                <Label htmlFor="email">email</Label>
                <Input
                  id="email"
                  placeholder="Enter Your email"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">password</Label>
                <Input
                  id="password"
                  placeholder="Enter Your password"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">role</Label>
                <Select onValueChange={(value) => setValue("role", value)}>
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
