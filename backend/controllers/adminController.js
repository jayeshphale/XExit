const Resignation = require("../models/Resignation");
const ExitResponse = require("../models/ExitResponse");
const sendEmail = require("../utils/nodemailer");

// View all resignations
const viewResignations = async (req, res) => {
  const data = await Resignation.find().populate("employeeId", "username");
  res.status(200).json({ data });
};

// Approve/Reject resignation
const concludeResignation = async (req, res) => {
  const { resignationId, approved, lwd } = req.body;
  const resignation = await Resignation.findById(resignationId);
  if(!resignation) return res.status(404).json({ message: "Not found" });

  resignation.status = approved ? "approved" : "rejected";
  if(approved) resignation.lwd = lwd;
  await resignation.save();

  // Send email notification
  sendEmail(resignation.employeeId, `Your resignation is ${resignation.status}`);
  res.status(200).json({ data: resignation });
};

// View exit responses
const viewExitResponses = async (req, res) => {
  const data = await ExitResponse.find().populate("employeeId", "username");
  res.status(200).json({ data });
};

module.exports = { viewResignations, concludeResignation, viewExitResponses };
