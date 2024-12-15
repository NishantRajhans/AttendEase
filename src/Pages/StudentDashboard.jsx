import React from "react";
import SideNav from "./Components/SideNavBar";
import MonthSelection from "./Components/MonthSelection";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import StudentSubjectSelection from "./Components/StudentSubjectSelection";
import StudentStatusList from "./Components/StudentStatusList";
import StudentBarChartComponent from "./Components/StudentBarChartComponent";
import StudentPieChartComponent from "./Components/StudentPieChartComponent";
const API=process.env.REACT_APP_API_URL
const StudentDashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedSubject, setSelectedSubject] = useState();
    const [totalAttendance, setTotalAttendance] = useState([]);
    const getTotalPresentCount= async () => {
      const date = moment(selectedMonth).format("DD/MM/YYYY");
      const MONTH = date.split("/")[1];
      const YEAR = date.split("/")[2];
      const Token = localStorage.getItem("Token");
      const subjectId = selectedSubject;
      const list = await axios.get(
        `${API}/api/v1/Student/GetGradeSubjectAttedance?subjectId=` +
          subjectId +
          "&month=" +
          MONTH +
          "&year=" +
          YEAR,
        {
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "application/json",
          },
        }
      );
      setTotalAttendance(list.data.response);
    };
    useEffect(() => {
        getTotalPresentCount();
    }, [selectedSubject, selectedMonth]);
    return (
      <div className="flex">
        <SideNav></SideNav>
        <div className="h-screen w-full ml-[20%]">
          <div className="header">
            <div className="text-4xl mt-3 font-extrabold p-[0.8rem] ml-5 shadow-md w-[95%] shadow-yellow-400">
              Student Dashboard
            </div>
            <div className="p-10">
              <div className="p-6 flex justify-between border rounded-lg shadow-sm w-[100%] mx-auto">
                <div className="flex gap-x-10">
                  <div className="flex justify-center items-center gap-2">
                    <div>Select Month</div>
                    <MonthSelection
                      selectedMonth={(value) => setSelectedMonth(value)}
                    ></MonthSelection>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <div>Select Subject</div>
                    <StudentSubjectSelection
                      selectedSubject={(value) => setSelectedSubject(value)}
                      setSelectedSubject={setSelectedSubject}
                    ></StudentSubjectSelection>
                  </div>
                </div>
              </div>
              <StudentStatusList
                selectedMonth={selectedMonth}
                selectedSubject={selectedMonth}
                totalAttendance={totalAttendance}
              ></StudentStatusList>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-2">
                  <StudentBarChartComponent
                    totalAttendance={totalAttendance}
                  ></StudentBarChartComponent>
                </div>
                <div>
                  <StudentPieChartComponent
                    totalAttendance={totalAttendance}
                  ></StudentPieChartComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default StudentDashboard
