import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';
const StudentStatusList = ({selectedMonth,selectedSubject,totalAttendance}) => {
    const [presentPercents, setPresentPercents] = useState(0);
    const getPresentRecord = () => {
        let count=0;
        totalAttendance.map((value)=>{
            if(value.present==1)count=count+1;
        })
        return count;
    };
    useEffect(() => {
        const totalPresentCount =getPresentRecord();
        const Persentper=(totalPresentCount/(totalAttendance?.length))*100;
        setPresentPercents(Persentper)
    }, [selectedMonth,selectedSubject,totalAttendance]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 my-6">
            <Card className="mx-auto" icon={<TrendingUp />} title={"Present Percentage"} value={presentPercents ? presentPercents.toFixed(1) + "%" : "0%"} />
            <Card icon={<TrendingDown />} title={"Absent Percentage"} value={presentPercents ? (100 - presentPercents).toFixed(1) + "%" : "100%"} />
        </div>
    );
}

export default StudentStatusList
