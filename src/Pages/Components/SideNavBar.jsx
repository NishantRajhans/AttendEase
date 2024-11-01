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
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { Button } from "../../components/ui/button";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Teachers",
      icon: BookOpenText,
      path: "/dashboard/teachers",
    },
    {
      id: 4,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 5,
      name: "Subjects",
      icon: Album,
      path: "/dashboard/subjects",
    },
  ];
  const UserEmail = localStorage.getItem("UserEmail");
  const UserName = localStorage.getItem("UserName");
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {}, [path]);
  return (
    <div className="border shadow-md h-screen p-5 w-[20%] fixed top-0 left-0 rounded-se-2xl shadow-yellow-300">
      <h1 className="text-3xl font-extrabold">AttendEase</h1>
      <hr className="my-5 bg-yellow-400 h-[1.5px]" />
      {menuList.map((menu, index) => (
        <a href={menu.path} key={index}>
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
        </a>
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
            <AlertDialogAction>LogOut</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SideNav;
