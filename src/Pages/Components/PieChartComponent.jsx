import moment from "moment";
import React from "react";
import { useState,useEffect } from "react";
import { ResponsiveContainer ,PieChart,Pie} from "recharts";

const PieChartComponent = ({totalPresentData,attandanceList}) => {
    const [data,setData]=useState()
    const getUniqueRecord = () => {
        const uniqueRecord = [];
        const existingUser = new Set();
        attandanceList?.forEach((record) => {
          if (!existingUser.has(record.STUDENT_ID)) {
            existingUser.add(record.STUDENT_ID);
            uniqueRecord.push(record);
          }
        });
        return uniqueRecord;
      };
      useEffect(()=>{
        AttendanceListCount();
      },[attandanceList||totalPresentData])
    const AttendanceListCount=()=>{
        const totalStudents=getUniqueRecord()?.length;
        const today=moment().format('D')
        const presentPercent = (totalPresentData?.length / (totalStudents * Number(today))) * 100;
        setData( [
            {
              "name": "Total Present",
              "value": Number(presentPercent.toFixed(1)),
              fill:"#4c8cf8"
            },
            {
              "name": "Total Absent",
              "value": 100-Number(presentPercent.toFixed(1)),
              fill:"#1fe6d1"
            }
        ])
    }
  return (
    <div className="bordered p-5 rounded-lg">
        <h2 className="font-bold text-xl">Monthly Attendance</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
