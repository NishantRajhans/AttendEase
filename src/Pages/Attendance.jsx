import React, { useEffect } from "react";
import SideNav from "./Components/SideNavBar";
import AttendanceList from "./Components/AttendanceList";
import MonthSelection from "./Components/MonthSelection";
import { Button } from "../components/ui/button";
import { useState } from "react";
import SubjectSelection from "./Components/SubjectSlection";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
const Attendance = () => {
  const [selectedMonth,setSelectedMonth]=useState();
    const [selectedSubject,setSelectedSubject]=useState();
    const[attandanceList,setAttandanceList]=useState();
    const [attendance,setAttendance]=useState([])
    const [studentList,setStudentList]=useState();
    const MarkAttendance=async (AttendanceDate)=>{
      const normalizedData =studentList.map(item => ({
        STUDENT_ID: item.STUDENT_ID,
        NAME: item.NAME,
      }));
      normalizedData .map(async(STUDENT)=>{
        if(attendance.find(id=>id=== STUDENT.STUDENT_ID)!=undefined){
          try {
            const token = localStorage.getItem("Token");
            const response = await axios.put(
              "https://attendease-backend-jom0.onrender.com/api/v1/Teacher/PutAttendance",
              {
                STUDENT_ID: STUDENT.STUDENT_ID,
                SUBJECT_ID: selectedSubject,
                PRESENT: true,
                ATTENDANCE_DATE: AttendanceDate,
              },
              {
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json",
                },
              }
            );
          } catch (error) {
            console.log(error.message);
          }
        }else{
          try {
            const token = localStorage.getItem("Token");
            const response = await axios.put(
              "https://attendease-backend-jom0.onrender.com/api/v1/Teacher/PutAttendance",
              {
                STUDENT_ID: STUDENT.STUDENT_ID,
                SUBJECT_ID: selectedSubject,
                PRESENT: false,
                ATTENDANCE_DATE: AttendanceDate,
              },
              {
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json",
                },
              }
            );
          } catch (error) {
            console.log(error.message);
          }
        }
      })
    }
    const onSearchHandelre= async()=>{
      const date=moment(selectedMonth).format('MM/YYYY')
      const Month=date.split('/')[0];
      const Year=date.split('/')[1];
      const Token=localStorage.getItem('Token');
      const Subject_id=selectedSubject
      try{
        const list=await axios.get("https://attendease-backend-jom0.onrender.com/api/v1/Teacher/FetchAttendance?Subject="+Subject_id+"&Month="+Month+"&Year="+Year,{headers:{
          'Authorization':"Bearer "+Token,
          'Content-Type':'application/json'
        }})
        const data=list?.data
        setAttandanceList(data?.response)
      }catch(err){
        console.log("error in fetching attendance list");
      }
      try{
        const response = await axios.get(
          "https://attendease-backend-jom0.onrender.com/api/v1/Teacher/FetchStudentOfParticularSubject?SUBJECT_ID="+Subject_id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + Token,
            },
          }
        );
        setStudentList(response.data.response)
      }catch(err){
        console.log("error in fetching student list");
      }
  }
  const onSubmit=async()=>{
    const currentDate=new Date();
    const formatDate=moment(currentDate).format("YYYY-MM-DD")
    MarkAttendance(formatDate)
    toast.success("Attendance taken successfully")
    setAttendance([])
  }
    useEffect(()=>{
      onSearchHandelre()
    },[selectedSubject||onSubmit])
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
              <Button onClick={() => onSubmit()} className="w-[15%]">Submit</Button>
            </div>
            <AttendanceList
              attandanceList={attandanceList}
              selectedMonth={selectedMonth}
              studentList={studentList}
              setAttendance={setAttendance}
              attendance={attendance}
            ></AttendanceList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
