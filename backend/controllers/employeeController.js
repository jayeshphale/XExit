const Resignation = require("../models/Resignation");
const ExitResponse = require("../models/ExitResponse");
const { checkHoliday } = require("../utils/calendarific");
const sendEmail = require("../utils/nodemailer");

// Submit resignation
const submitResignation = async (req, res) => {
  const { lwd } = req.body;

  // Check weekend
  const day = new Date(lwd).getDay();
  if(day === 0 || day === 6) return res.status(400).json({ message: "LWD cannot be on weekend" });

  // Check holiday via Calendarific
  const isHoliday = await checkHoliday(lwd);
  if(isHoliday) return res.status(400).json({ message: "LWD is a holiday" });

  const resignation = await Resignation.create({ employeeId: req.user._id, lwd });
  res.status(200).json({ data: { resignation } });
};

// Submit exit responses
const submitExitResponses = async (req, res) => {
  const { responses } = req.body;
  const exitResponse = await ExitResponse.create({ employeeId: req.user._id, responses });
  res.status(200).json({ data: exitResponse });
};

module.exports = { submitResignation, submitExitResponses };
