import React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Trash} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import axios from "axios";
const SubjectDeleteButton = ({data,fetchSubjectList}) => {
  const HandleDelete=async (value)=>{
    try{
      const GRADE_ID=value.data.GRADE_ID;
      const TEACHER_ID=value.data.TEACHER_ID;
      const SUBJECT_ID=value.data.SUBJECT_ID;
      const Subjectt = await axios.delete(
        `http://localhost:4000/api/v1/Admin/DeleteSubject?Subject=${SUBJECT_ID}&Grade=${GRADE_ID}&Teacher=${TEACHER_ID}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      );      
      fetchSubjectList(); 
    }catch(err){
      console.log("error in delete student "+err)
    }
  }
  return (
    <AlertDialog>
          <AlertDialogTrigger>
            <Button size="sm">
              <Trash></Trash>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this Subject.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() =>HandleDelete(data)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
  )
}

export default SubjectDeleteButton
