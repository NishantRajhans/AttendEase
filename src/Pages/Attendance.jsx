import React, { useEffect } from "react";
import SideNav from "./Components/SideNavBar";
import AttendanceList from "./Components/AttendanceList";
import MonthSelection from "./Components/MonthSelection";
import GradeSelection from "./Components/GradeSelection";
import { Button } from "../components/ui/button";
import { useState } from "react";
import SubjectSelection from "./Components/SubjectSlection";
import moment from "moment";
import axios from "axios";
const Attendance = () => {
  const [selectedMonth,setSelectedMonth]=useState();
    const [selectedSubject,setSelectedSubject]=useState();
    const[attandanceList,setAttandanceList]=useState();
    const onSearchHandelre= async()=>{
      const date=moment(selectedMonth).format('MM/YYYY')
      const Month=date.split('/')[0];
      const Year=date.split('/')[1];
      const Token=localStorage.getItem('Token');
      const Subject=selectedSubject
      console.log(Subject,Month,Year)
      const list=await axios.get("http://localhost:4000/api/v1/Teacher/FetchAttendance?Subject="+Subject+"&Month="+Month+"&Year="+Year,{headers:{
        'Authorization':"Bearer "+Token,
        'Content-Type':'application/json'
      }})
      const data=list?.data
      setAttandanceList(data?.response)
  }
    useEffect(()=>{
      onSearchHandelre()
    },[selectedSubject])
  return (
    <div className="flex">
      <SideNav></SideNav>
      <div className="h-screen w-full ml-[20%]">
        <div className="header">
          <div className="text-4xl mt-3 font-extrabold p-[0.8rem] ml-5 shadow-md w-[95%] shadow-yellow-400">
            Attendance
          </div>
          <div className="p-6 mt-4">
            <div className="p-7 flex justify-between border rounded-lg shadow-sm w-[95%] mx-auto mt-2">
              <div className="flex gap-2 items-center">
                <lable>Select Month</lable>
                <MonthSelection
                  selectedMonth={(value) => setSelectedMonth(value)}
                ></MonthSelection>
              </div>
              <div className="flex gap-2 items-center">
                <lable>Select Grade</lable>
                <SubjectSelection
                  setSelectedSubject={setSelectedSubject}
                ></SubjectSelection>
              </div>
              <Button onClick={() => onSearchHandelre()} className="w-[15%]">Search</Button>
            </div>
            <AttendanceList
              attandanceList={attandanceList}
              selectedMonth={selectedMonth}
              selectedSubject={selectedSubject}
            ></AttendanceList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
