"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
const GradeSelection = ({ selectedGrade }) => {
  const [grades, setGrades] = useState([]);
  const getGrades = async () => {
    try {
      const response = await axios.get("/api/grade");
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
            <option key={index} value={grade.SEMESTER}>
              {grade.SEMESTER}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GradeSelection;
