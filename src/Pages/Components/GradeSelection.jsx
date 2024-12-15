"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
const API=process.env.REACT_APP_API_URL
const GradeSelection = ({ selectedGrade }) => {
  const [grades, setGrades] = useState([]);
  const getGrades = async () => {
    try {
      const response = await axios.get(`${API}/api/v1/Admin/GetAllGrade`);
      const gradeData = response.data;
      setGrades(gradeData.data || []);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };
  useEffect(() => {
    getGrades();
  }, []);
  return (
    <div>
      <div className="flex flex-col">
        <select
          className="w-full h-10 border rounded-md"
          onChange={(event)=>selectedGrade(event.target.value)}
        >
          {grades?.map((grade, index) => (
            <option key={index} value={grade.gradeId}>
              {grade.gradeName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GradeSelection;
