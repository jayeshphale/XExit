import React from "react";
import ResignationForm from "../components/ResignationForm";
import ExitInterviewForm from "../components/ExitInterviewForm";

const EmployeeDashboard = () => {
  return (
    <div>
      <h2>Employee Dashboard</h2>
      <ResignationForm />
      <hr/>
      <ExitInterviewForm />
    </div>
  );
};

export default EmployeeDashboard;
