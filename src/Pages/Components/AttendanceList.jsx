"use client";
import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from "moment";
import axios from "axios";
const pagination = true;
const paginationPageSize = 20;
const paginationPageSizeSelector = [20, 100, 500];
const AttendanceList = ({ attandanceList, selectedMonth, selectedSubject }) => {
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
      { field: "NAME", headerName: "Name", filter: true },
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
  const isPresent = (date, STUDENT_ID) => {
    return attandanceList?.some(
      (item) => item.ATTENDANCE_DAY === date && item.STUDENT_ID === STUDENT_ID
    );
  };
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
  useEffect(() => {
    if (attandanceList) {
      const userList = getUniqueRecord();
      userList.forEach((obj) => {
        daysArray.forEach((day) => {
          obj[day] = isPresent(day, obj.STUDENT_ID);
        });
      });
      setRowData(userList);
    }
  }, [attandanceList, daysArray]);
  const onMarkAttendance = async (day, STUDENT_ID, presentStatus) => {
    const TeacherId = localStorage.getItem("UserId");
    const date = moment(selectedMonth).format("YYYY-MM");
    const AttendanceDate = moment(`${date}-${day}`, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    if (presentStatus) {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.put(
          "http://localhost:4000/api/v1/Teacher/PutAttendance",
          {
            STUDENT_ID: STUDENT_ID,
            SUBJECT_ID: selectedSubject,
            TEACHER_ID: TeacherId,
            PRESENT: presentStatus,
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
    } else {
      try {
        const response = await axios.delete(
          "/api/attendance?day=" +
            day +
            "&date=" +
            date +
            "&studentid=" +
            STUDENT_ID
        );
      } catch (error) {
        console.log(error.message);
      }
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
            event.data.STUDENT_ID,
            event.value
          );
        }}
      />
    </div>
  );
};

export default AttendanceList;
