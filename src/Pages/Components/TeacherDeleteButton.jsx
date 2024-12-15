import React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {Trash} from "lucide-react";
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
import { toast } from "react-toastify";
const API=process.env.REACT_APP_API_URL
const TeacherDeleteButton = ({data,fetchTeacherList}) => {
    const HandleDelete=async (id)=>{
        try{
          const response=await axios.delete(`${API}/api/v1/Admin/DeleteTeacher/${id}`,{
            headers:{
              "Authorization": "Bearer "+localStorage.getItem("Token")
            }
          })
          if(response.data.success==true){
            toast.success(response.data.message)
            fetchTeacherList(); 
          }else toast.error(response.data.message)
        }catch(err){
          toast.error("Error in deleting Teacher")
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
                This action cannot be undone. This will permanently delete this
                teacher account
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => {console.log(data);HandleDelete(data.teacherId)}}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
}

export default TeacherDeleteButton
