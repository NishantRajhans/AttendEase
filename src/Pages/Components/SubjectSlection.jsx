import React, { useState, useEffect } from "react";
import axios from "axios";
const API=process.env.REACT_APP_API_URL
const SubjectSelection = ({setSelectedSubject}) => {
  const [Subject, setSubject] = useState([]);
  const getSubject = async () => {
    try {
      const token=localStorage.getItem('Token');
      const response = await axios.get(`${API}/api/v1/Teacher/FetchSubject`,{
        headers:{
        'Authorization':"Bearer "+token,
        'Content-Type':'application/json'
      }});
      const subjectData = response.data;
      setSubject(subjectData.response || []);
      setSelectedSubject(subjectData.response[0].subjectId)
    } catch (error) {
      console.error("Error fetching Subject:", error);
    }
  };
  useEffect(() => {
    getSubject();
  }, []);
  return (
    <div>
      <div className="flex flex-col">
        <select
          className="w-full h-10 border rounded-md"
          onChange={(event)=>setSelectedSubject(event.target.value)}
        >
          {Subject?.map((subject, index) => (
            <option key={index} value={subject.subjectId}>
              {subject.subjectName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SubjectSelection;
