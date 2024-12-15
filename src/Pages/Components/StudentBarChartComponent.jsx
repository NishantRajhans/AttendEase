import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
} from "recharts";
const StudentBarChartComponent = ({ totalAttendance }) => {
  const [data, setData] = useState([]);

  const AttendanceListCount = () => {
    const result = totalAttendance?.map((item) => ({
      day: moment(item.attendanceDate).date(),
      present: item.present == 1 ? 1 : 0,
      absent: item.present == 0 ? 1 : 0,
    }));
    setData(result);
  };
  useEffect(() => {
    AttendanceListCount();
  }, [totalAttendance]);
  return (
    <div className="p-5 border rounded-lg shadow-sm">
      <h2 className="my-2 font-bold text-lg">Attendance</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis tick={false}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="present" name="Present" fill="#4c8cf8" />
          <Bar dataKey="absent" name="Absent" fill="#1fe6d1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentBarChartComponent;
