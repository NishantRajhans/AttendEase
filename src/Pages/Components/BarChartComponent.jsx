import React from "react";
import { useEffect, useState } from "react";
import { ResponsiveContainer,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Bar,BarChart} from "recharts";

const BarChartComponent = ({attandanceList,totalPresentData}) => {
    const [data,setData]=useState([])
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
    const AttendanceListCount=()=>{
        const totalStudent=getUniqueRecord();
        console.log(totalPresentData)
        const result=totalPresentData?.map((item)=>({
            day:item.ATTENDANCE_DAY,
            presentCount:item.presentCount,
            absentCount:Number(totalStudent?.length)-Number(item.presentCount)
        }))
        setData(result)
    }
    useEffect(()=>{
      AttendanceListCount();
    },[attandanceList||totalPresentData])
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
