import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie } from "recharts";
const StudentPieChartComponent = ({ totalAttendance }) => {
  const [data, setData] = useState();
  const getPresentRecord = () => {
    let count = 0;
    totalAttendance.map((value) => {
      if (value.present == 1) count = count + 1;
    });
    return count;
  };
  const AttendanceListCount = () => {
    const totalPresentCount = getPresentRecord();
    const presentPercent = (totalPresentCount / totalAttendance?.length) * 100;
    setData([
      {
        name: "Total Present",
        value: Number(presentPercent.toFixed(1)),
        fill: "#4c8cf8",
      },
      {
        name: "Total Absent",
        value: 100 - Number(presentPercent.toFixed(1)),
        fill: "#1fe6d1",
      },
    ]);
  };
  useEffect(() => {
    AttendanceListCount();
  }, [totalAttendance]);
  return (
    <div className="bordered p-5 rounded-lg">
      <h2 className="font-bold text-xl">Monthly Attendance</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentPieChartComponent;
