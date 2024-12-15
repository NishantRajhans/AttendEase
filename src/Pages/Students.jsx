import SideNav from "./Components/SideNavBar";
import React, { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import StudentList from "./Components/StudentList";
const API=process.env.REACT_APP_API_URL
const Students = () => {
  const [Studentlist, setStudentlist] = useState();
  const [grades, setGrades] = useState([]);
  const fetchStudentList = async () => {
    const Student=await axios.get(`${API}/api/v1/Admin/GetAllStudent`,{
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem("Token")
      }
    })
    setStudentlist(Student.data.response);
  };
    const getGrades = async () => {
      try {
        const response = await axios.get(`${API}/api/v1/Admin/GetAllGrade`,{
          headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("Token")
          }
        });
        const gradeData = response.data.response; 
        setGrades(gradeData);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    };
  useEffect(() => {
    getGrades();
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
            grades={grades}
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Students;