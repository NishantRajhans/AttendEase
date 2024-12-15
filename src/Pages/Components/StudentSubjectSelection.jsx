import React, { useState, useEffect } from "react";
import axios from "axios";
const API=process.env.REACT_APP_API_URL
const StudentSubjectSelection = ({setSelectedSubject}) => {
    const [Subject, setSubject] = useState([]);
    const getSubject = async () => {
      try {
        const token=localStorage.getItem('Token');
        const response = await axios.get(`${API}/api/v1/Student/GetGradeSubject`,{
          headers:{
          'Authorization':"Bearer "+token,
          'Content-Type':'application/json'
        }});
        const subjectData = response.data;
        setSubject(subjectData.response || []);
        setSelectedSubject(subjectData.response[0].SUBJECT_ID)
        console.log(subjectData.response[0].SUBJECT_ID);
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
              <option key={index} value={subject.SUBJECT_ID}>
                {subject.SUBJECT_NAME}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
}

export default StudentSubjectSelection
