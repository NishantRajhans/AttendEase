import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Attendance from "./Pages/Attendance";
import Students from "./Pages/Students";
import Teacher from "./Pages/Teacher";
import Subjects from "./Pages/Subjects";
import Protected from "./Protected";

function App() {
  const [role, setRole] = useState(
    localStorage.getItem("Role") ? localStorage.getItem("Role") : null
  );

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route element={<Protected />}>
        <Route
          path="/"
          element={
            role === "Admin" ? (
              <Navigate to="/Dashboard/Students" />
            ) : role === "Teacher" ? (
              <Navigate to="/Dashboard" />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {role === "Admin" && (
          <>
            <Route path="/Dashboard/Students" element={<Students />} />
            <Route path="/Dashboard/Teachers" element={<Teacher />} />
            <Route path="/Dashboard/Subjects" element={<Subjects />} />
          </>
        )}
        {role === "Teacher" && (
          <>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Dashboard/Attendance" element={<Attendance />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;
