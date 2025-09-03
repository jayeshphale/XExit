import React, { useEffect, useState } from "react";
import API from "../utils/api";

const AdminDashboard = () => {
  const [resignations, setResignations] = useState([]);
  const [message, setMessage] = useState("");

  const fetchResignations = async () => {
    try {
      const res = await API.get("/admin/resignations");
      setResignations(res.data.data);
    } catch(err) {
      setMessage("Failed to fetch resignations");
    }
  };

  const handleConclude = async (id, approve) => {
    try {
      const lwd = approve ? prompt("Enter LWD (YYYY-MM-DD)") : "";
      await API.put("/admin/conclude_resignation", { resignationId:id, approved:approve, lwd });
      fetchResignations();
    } catch(err) {
      setMessage(err.response?.data?.message || "Action failed");
    }
  };

  useEffect(()=>{ fetchResignations(); }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {message && <p>{message}</p>}
      <h3>Resignations</h3>
      <ul>
        {resignations.map(r=>(
          <li key={r._id}>
            {r.employeeId.username} - {r.lwd} - {r.status} 
            {r.status==="pending" && <>
              <button onClick={()=>handleConclude(r._id,true)}>Approve</button>
              <button onClick={()=>handleConclude(r._id,false)}>Reject</button>
            </>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
