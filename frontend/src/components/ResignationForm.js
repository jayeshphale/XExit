import React, { useState } from "react";
import API from "../utils/api";

const ResignationForm = () => {
  const [lwd, setLwd] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/resign", { lwd });
      setMessage("Resignation submitted successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div>
      <h3>Submit Resignation</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="date" value={lwd} onChange={e => setLwd(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResignationForm;
