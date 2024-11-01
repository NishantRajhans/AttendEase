import SideNav from "./Components/SideNavBar";
import React, { useEffect, useState } from "react";
import SubjectList from "./Components/SubjectList";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
const Subject = () => {
  const [Subjectslist, setSubjectslist] = useState();
  const fetchSubjectList = async () => {
    const Subject=await axios.get("http://localhost:4000/api/v1/Admin/GetAllSubject")
    setSubjectslist(Subject.data.response);
  };
  const [Teacherslist, setTeacherslist] = useState();
  const fetchTeacherList = async () => {
    const Teacher = await axios.get(
      "http://localhost:4000/api/v1/Admin/GetAllTeacher"
    );
    setTeacherslist(Teacher.data.response);
  };
  useEffect(() => {
    fetchSubjectList();
    fetchTeacherList();
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
            setSubjectlist={setSubjectslist}
          />
          </div>
        </div>
    </div>
    </div>
  )
}

export default Subject
