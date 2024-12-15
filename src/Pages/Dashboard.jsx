import React from "react";
import SideNav from "./Components/SideNavBar";
import SubjectSelection from "./Components/SubjectSlection";
import BarChartComponent from "./Components/BarChartComponent";
import PieChartComponent from "./Components/PieChartComponent";
import StatusList from "./Components/StatusList";
import MonthSelection from "./Components/MonthSelection";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
const API=process.env.REACT_APP_API_URL
const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [attandanceList, setAttandanceList] = useState();
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalPresentData, setTotalPresentData] = useState([]);
  const fetchedAttendanceList = async () => {
    const date = moment(selectedMonth).format("MM/YYYY");
    const Month = date.split("/")[0];
    const Year = date.split("/")[1];
    const Token = localStorage.getItem("Token");
    const Subject = selectedSubject;
    const list = await axios.get(
      `${API}/api/v1/Teacher/FetchAttendance?subjectId=` +
        Subject +
        "&month=" +
        Month +
        "&year=" +
        Year,
      {
        headers: {
          Authorization: "Bearer " + Token,
          "Content-Type": "application/json",
        },
      }
    );
    const value = list?.data?.response||[];
    setAttandanceList(value);
    value?.map((val)=>{
      if(val.present==1)setTotalPresent((prev)=>prev+1);
    })
  };
  const getTotalPresentCountByDay = async () => {
    const date = moment(selectedMonth).format("DD/MM/YYYY");
    const Month = date.split("/")[1];
    const Year = date.split("/")[2];
    const Token = localStorage.getItem("Token");
    const Subject = selectedSubject;
    const list = await axios.get(
      `${API}/api/v1/Teacher/FetchTotalPresent?subjectId=` +
        Subject +
        "&month=" +
        Month +
        "&year=" +
        Year,
      {
        headers: {
          Authorization: "Bearer " + Token,
          "Content-Type": "application/json",
        },
      }
    );
    setTotalPresentData(list.data.response);
  };
  useEffect(() => {
    setTotalPresent(0)
    getTotalPresentCountByDay();
    fetchedAttendanceList();
  }, [selectedSubject, selectedMonth]);
  return (
    <div className="flex">
      <SideNav></SideNav>
      <div className="h-screen w-full ml-[20%]">
        <div className="header">
          <div className="text-4xl mt-3 font-extrabold p-[0.8rem] ml-5 shadow-md w-[95%] shadow-yellow-400">
            Dashboard
          </div>
          <div className="p-10">
            <div className="p-6 flex justify-between border rounded-lg shadow-sm w-[100%] mx-auto">
              <div className="flex gap-x-10">
                <div className="flex justify-center items-center gap-2">
                  <div>Select Month</div>
                  <MonthSelection
                    selectedMonth={(value) => setSelectedMonth(value)}
                    setSelectedMonth={setSelectedMonth}
                  ></MonthSelection>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div>Select Subject</div>
                  <SubjectSelection
                    selectedSubject={(value) => setSelectedSubject(value)}
                    setSelectedSubject={setSelectedSubject}
                  ></SubjectSelection>
                </div>
              </div>
            </div>
            <StatusList
              selectedMonth={selectedMonth}
              selectedSubject={selectedMonth}
              attandanceList={attandanceList}
              totalPresent={totalPresent}
            ></StatusList>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-2">
                <BarChartComponent
                  attandanceList={attandanceList}
                  totalPresentData={totalPresentData}
                ></BarChartComponent>
              </div>
              <div>
                <PieChartComponent
                  attandanceList={attandanceList}
                  totalPresent={totalPresent}
                ></PieChartComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
