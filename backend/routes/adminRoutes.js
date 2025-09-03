const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");
const { viewResignations, concludeResignation, viewExitResponses } = require("../controllers/adminController");

router.get("/resignations", protect, authorize("admin"), viewResignations);
router.put("/conclude_resignation", protect, authorize("admin"), concludeResignation);
router.get("/exit_responses", protect, authorize("admin"), viewExitResponses);

module.exports = router;
