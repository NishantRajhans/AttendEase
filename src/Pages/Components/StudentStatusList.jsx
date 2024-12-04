import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';
const StudentStatusList = ({selectedMonth,selectedSubject ,attandanceList,totalPresentData}) => {
  const [totalStudent, setTotalStudent] = useState(0);
    const [presentPercents, setPresentPercents] = useState(0);

    const getUniqueRecord = () => {
        const uniqueRecord = [];
        const existingUser = new Set();
        attandanceList?.forEach((record) => {
            if (!existingUser.has(record.STUDENT_ID)) {
                existingUser.add(record.STUDENT_ID);
                uniqueRecord.push(record);
            }
        });
        return uniqueRecord?.length;
    };

    useEffect(() => {
        const totalStudents = getUniqueRecord();
        setTotalStudent(totalStudents);
        const today = moment().format('D');
        const presentPercent = (totalPresentData?.length / (totalStudents * Number(today))) * 100;
        setPresentPercents(presentPercent || 0);
    }, [selectedMonth,selectedSubject,attandanceList]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
            <Card icon={<TrendingUp />} title={"Present Percentage"} value={presentPercents ? presentPercents.toFixed(1) + "%" : "0%"} />
            <Card icon={<TrendingDown />} title={"Absent Percentage"} value={presentPercents ? (100 - presentPercents).toFixed(1) + "%" : "100%"} />
        </div>
    );
}

export default StudentStatusList
