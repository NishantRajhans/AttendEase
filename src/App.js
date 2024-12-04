import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Attendance from "./Pages/Attendance";
import Students from "./Pages/Students";
import Teacher from "./Pages/Teacher";
import Subjects from "./Pages/Subjects";
import StudentDashboard from "./Pages/StudentDashboard";

function App() {
  const [isLoggedIn,setIsLogIn] =useState(localStorage.getItem("Token")?true:false);
  return (
    <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Dashboard/Students" element={<Students />} />
        <Route path="/Dashboard/Teachers" element={<Teacher />} />
        <Route path="/Dashboard/Subjects" element={<Subjects />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/StudentDashboard" element={<StudentDashboard></StudentDashboard>}></Route>
        <Route path="/Dashboard/Attendance" element={<Attendance />} />
    </Routes>
  );
}

export default App;
