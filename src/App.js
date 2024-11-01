import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Attendance from "./Pages/Attendance";
import Students from "./Pages/Students";
import Teacher from "./Pages/Teacher";
import Subjects from "./Pages/Subjects";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Dashboard/Attendance" element={<Attendance />} />
      <Route path="/Dashboard/Students" element={<Students />} />
      <Route path="/Dashboard/Teachers" element={<Teacher />} />
      <Route path="/Dashboard/Subjects" element={<Subjects />} />
    </Routes>
  );
}

export default App;
