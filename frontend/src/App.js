import React, { useState } from "react";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [userRole, setUserRole] = useState("");

  if(!userRole) return <Login setUserRole={setUserRole} />;
  return userRole==="admin" ? <AdminDashboard /> : <EmployeeDashboard />;
}

export default App;
