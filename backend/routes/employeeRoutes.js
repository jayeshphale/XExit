const express = require("express");
const router = express.Router();
const { submitResignation, submitExitResponses } = require("../controllers/employeeController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/resign", protect, submitResignation);
router.post("/responses", protect, submitExitResponses);

module.exports = router;
