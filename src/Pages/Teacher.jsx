import SideNav from "./Components/SideNavBar";
import React, { useEffect, useState } from "react";
import TeacherList from "./Components/TeacherList";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
const API=process.env.REACT_APP_API_URL
const Teacher = () => {
  const [Teacherslist, setTeacherslist] = useState();
  const fetchTeacherList = async () => {
    const Teacher=await axios.get(`${API}/api/v1/Admin/GetAllTeacher`,{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("Token")
      }
    })
    setTeacherslist(Teacher.data.response);
  };
  useEffect(() => {
    fetchTeacherList();
  }, []);
  return (
    <div>
      <div className='flex'>
        <SideNav></SideNav>
        <div className='h-screen w-full ml-[20%]'>
          <div className='header'>
          <div className="text-4xl mt-3 font-extrabold p-[0.8rem] ml-5 shadow-md w-[95%] shadow-yellow-400">
            Teacher
          </div>
            <TeacherList
            Teacherslist={Teacherslist}
            fetchTeacherList={fetchTeacherList}
          />
          </div>
        </div>
    </div>
    </div>
  )
}

export default Teacher
