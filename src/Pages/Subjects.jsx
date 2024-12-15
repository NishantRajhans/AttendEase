import SideNav from "./Components/SideNavBar";
import React, { useEffect, useState } from "react";
import SubjectList from "./Components/SubjectList";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
const API=process.env.REACT_APP_API_URL
const Subject = () => {
  const [Subjectslist, setSubjectslist] = useState();
  const [grades, setGrades] = useState([]);
  const fetchSubjectList = async () => {
    const Subject=await axios.get(`${API}/api/v1/Admin/GetAllSubject`,{
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem("Token")
      }
    });
    setSubjectslist(Subject.data.response);
  };
  const [Teacherslist, setTeacherslist] = useState();
  const fetchTeacherList = async () => {
    const Teacher = await axios.get(
      `${API}/api/v1/Admin/GetAllTeacher`,{
        headers:{
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("Token")
        }
      }
    );
    setTeacherslist(Teacher.data.response);
  };
  const getGrades = async () => {
    try {
      const response = await axios.get(`${API}/api/v1/Admin/GetAllGrade`,{
        headers:{
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("Token")
        }
      });
      const gradeData = response.data;
      setGrades(gradeData.response || []);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };
  useEffect(() => {
    fetchSubjectList();
    fetchTeacherList();
    getGrades();
  }, []);
  return (
    <div>
      <div className='flex'>
        <SideNav></SideNav>
        <div className='h-screen w-full ml-[20%]'>
          <div className='header'>
          <div className="text-4xl mt-3 font-extrabold p-[0.8rem] ml-5 shadow-md w-[95%] shadow-yellow-400">
            Subject
          </div>
            <SubjectList
            Subjectslist={Subjectslist}
            Teacherslist={Teacherslist}
            fetchSubjectList={fetchSubjectList}
            grades={grades}
          />
          </div>
        </div>
    </div>
    </div>
  )
}

export default Subject
