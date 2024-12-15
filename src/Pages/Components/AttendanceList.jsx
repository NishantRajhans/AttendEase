"use client";
import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from "moment";
const pagination = true;
const paginationPageSize = 20;
const paginationPageSizeSelector = [20, 100, 500];
const AttendanceList = ({ attandanceList, selectedMonth,studentList,setAttendance,attendance}) => {
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const numberOfDays = daysInMonth(
    moment(selectedMonth).year(),
    moment(selectedMonth).month()
  );
  const daysArray = useMemo(
    () => Array.from({ length: numberOfDays }, (_, i) => i + 1),
    [numberOfDays]
  );
  const colDefs = useMemo(() => {
    const baseCols = [
      { field: "name", headerName: "Name", filter: true },
    ];
    const dayCols = daysArray.map((day) => ({
      field: day.toString(),
      headerName: `${day}`,
      width: 50,
      editable: true,
    }));
    return [...baseCols, ...dayCols];
  }, [daysArray]);
  const [rowData, setRowData] = useState([]);
  const ispresent = (date, studentId) => {
    if(attandanceList?.find(
      (item) => moment(item.attendanceDate).date() === date && item.studentId === studentId&&item.present==1
    )) return true
    else return false
  };
  useEffect(() => {
      const userList =studentList
      userList?.forEach((obj) => {
        daysArray.forEach((day) => {
          obj[day] =ispresent(day, obj.studentId);
        });
      });
      setRowData(userList);
  }, [attandanceList, daysArray,studentList]);
  const onMarkAttendance = async (day, studentId, presentStatus) => {
    const TeacherId = localStorage.getItem("UserId");
    const date = moment(selectedMonth).format("YYYY-MM");
    const AttendanceDate = moment(`${date}-${day}`, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    const currentDate=new Date();
    const formatDate=moment(currentDate).format("YYYY-MM-DD")
    if(formatDate==AttendanceDate){
      const array=attendance?.filter((id)=>id!=studentId)
      array?.push(studentId);
      setAttendance(array);
    }
  };
  return (
    <div className="ag-theme-quartz mt-5 p-3" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        onCellValueChanged={(event) => {
          onMarkAttendance(
            event.column.colId,
            event.data.studentId,
            event.value
          );
        }}
      />
    </div>
  );
};

export default AttendanceList;
