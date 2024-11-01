import SideNav from "./Components/SideNavBar";
import React, { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import StudentList from "./Components/StudentList";
const Students = () => {
  const [Studentlist, setStudentlist] = useState();
  const fetchStudentList = async () => {
    const Student=await axios.get("http://localhost:4000/api/v1/Admin/GetAllStudent")
    setStudentlist(Student.data.response);
  };
  useEffect(() => {
    fetchStudentList();
  }, []);
  return (
    <div>
      <div className="flex">
        <SideNav className="fixed"></SideNav>
        <div className="h-screen w-full ml-[20%]">
        <div className="header">
          <div className="text-4xl mt-3 font-extrabold p-[0.8rem] ml-5 shadow-md w-[95%] shadow-yellow-400">
            Students
          </div>
          <StudentList
            Studentlist={Studentlist}
            fetchStudentList={fetchStudentList}
            setStudentlist={setStudentlist}
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Students;
