"use client";
import React from "react";
import {
  Album,
  BookOpenText,
  GraduationCap,
  Hand,
  LayoutIcon,
  Settings,
} from "lucide-react";
import { useEffect,useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { toast } from "react-toastify";
const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutIcon,
      path: "/Dashboard",
      role:"Teacher"
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/Dashboard/Students",
      role:"Admin"
    },
    {
      id: 3,
      name: "Teachers",
      icon: BookOpenText,
      path: "/Dashboard/Teachers",
      role:"Admin"
    },
    {
      id: 4,
      name: "Attendance",
      icon: Hand,
      path: "/Dashboard/Attendance",
      role:"Teacher"
    },
    {
      id: 5,
      name: "Subjects",
      icon: Album,
      path: "/Dashboard/Subjects",
      role:"Admin"
    },
    {
      id:6,
      name:"Student-Dashboard",
      icon:LayoutIcon,
      path:"/StudentDashboard",
      role:"Student"
    }
  ];
  const navigate=useNavigate()
  const UserEmail = localStorage.getItem("UserEmail");
  const UserName = localStorage.getItem("UserName");
  const location = useLocation();
  const [role, setRole] = useState(
    localStorage.getItem("Role") ? localStorage.getItem("Role") : null
  );
  const HandleLogout=()=>{
    try{
      localStorage.removeItem("UserId");
      localStorage.removeItem("UserName");
      localStorage.removeItem("UserEmail");
      localStorage.removeItem("Token");
      localStorage.removeItem("Role");
      toast.success("User LogOut Sucessfully")
      navigate("/LogIn")
    }catch(error){
      toast.error("Error in LogOut")
    };
  }
  const path = location.pathname;
  return (
    <div className="border shadow-md h-screen p-5 w-[20%] fixed top-0 left-0 rounded-se-2xl shadow-yellow-300">
      <div className="flex justify-center items-center gap-x-4">
        <img src="/utils/images (8).jpeg" alt="logo" width={"56px"} className=" rounded-md"></img>
      <h1 className="text-3xl font-extrabold">AttendEase</h1>
      </div>
      <hr className="my-5 bg-yellow-400 h-[1.5px]" />
      {menuList.map((menu, index) => (
        role==menu.role?(<Link to={menu.path} key={index}>
          <h2
            className={`
              flex items-center gap-3 text-md p-4 text-slate-600 hover:bg-primary hover:text-white cursor-pointer rounded-lg my-2 ${
                menu.path === path
                  ? "bg-yellow-400 text-white"
                  : "text-slate-500"
              }`}
          >
            <menu.icon />
            {menu.name}
          </h2>
        </Link>):(null)
      ))}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex gap-2 items-center bottom-5 fixed p-2 cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-sm">{UserName || "Guest"}</h2>
              <h2 className="text-xs text-slate-400">
                {UserEmail || "Not logged in"}
              </h2>
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
            You will be logged out of your account. Any unsaved changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={HandleLogout}>LogOut</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SideNav;
