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
import { toast } from "react-toastify";
const API=process.env.REACT_APP_API_URL
const DeleteButton = ({data,fetchStudentList}) => {
      const HandleDelete=async (id)=>{
        try{
          const response=await axios.delete(`${API}/api/v1/Admin/DeleteStudent/${id}`,{
            headers:{
              "Authorization": "Bearer "+localStorage.getItem("Token")
            }
          })
          if(response.data.success==true){
            fetchStudentList(); 
            toast.success(response.data.message)
          }else toast.error(response.data.message)
        }catch(err){
          toast.error("error in delete student ")
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
                This action cannot be undone. This will permanently delete this student account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() =>HandleDelete(data.studentId)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
}

export default DeleteButton
