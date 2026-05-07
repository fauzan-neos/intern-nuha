const express = require("express");
const router = express.Router();
const { getDoctors, getSpecializations } = require("../controllers/doctor.controller");

router.get("/doctors", getDoctors);
router.get("/specializations", getSpecializations);

module.exports = router;