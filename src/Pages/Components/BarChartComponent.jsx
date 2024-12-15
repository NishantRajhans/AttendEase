import React from "react";
import { useEffect, useState } from "react";
import { ResponsiveContainer,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Bar,BarChart} from "recharts";

const BarChartComponent = ({attandanceList,totalPresentData}) => {
    const [data,setData]=useState([])
    const getUniqueRecord = () => {
        const uniqueRecord = [];
        const existingUser = new Set();
        attandanceList?.forEach((record) => {
          if (!existingUser.has(record.studentId)) {
            existingUser.add(record.studentId);
            uniqueRecord.push(record);
          }
        });
        return uniqueRecord;
      };
    const AttendanceListCount=()=>{
        const totalStudent=getUniqueRecord();
        const result=totalPresentData?.map((item)=>({
            day:item.attendanceDay,
            presentCount:item.presentCount,
            absentCount:Number(totalStudent?.length)-Number(item.presentCount)
        }))
        setData(result)
    }
    useEffect(()=>{
      AttendanceListCount();
    },[attandanceList])
    useEffect(()=>{
      AttendanceListCount();
    },[totalPresentData])
  return (
    <div className="p-5 border rounded-lg shadow-sm">
        <h2 className="my-2 font-bold text-lg">Attendance</h2>
        <ResponsiveContainer width={'100%'} height={300}>
        <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="presentCount" name="Total Present" fill="#4c8cf8" />
        <Bar dataKey="absentCount" name="Total Absent" fill="#1fe6d1" />
      </BarChart>
      </ResponsiveContainer>
    </div> 
  );
};

export default BarChartComponent;
