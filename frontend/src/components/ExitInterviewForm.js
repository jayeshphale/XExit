import React, { useState } from "react";
import API from "../utils/api";

const ExitInterviewForm = () => {
  const [responses, setResponses] = useState([{ questionText:"Why are you leaving?", response:"" }]);
  const [message, setMessage] = useState("");

  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index].response = value;
    setResponses(newResponses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/user/responses", { responses });
      setMessage("Exit Interview submitted!");
    } catch(err) {
      setMessage(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div>
      <h3>Exit Interview</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        {responses.map((q, i) => (
          <div key={i}>
            <label>{q.questionText}</label>
            <input value={q.response} onChange={e=>handleChange(i,e.target.value)} required/>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExitInterviewForm;
