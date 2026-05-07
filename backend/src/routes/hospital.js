const express = require("express");
const router = express.Router();
const { getHospitalUpdates } = require("../controllers/hospital.controller");

router.get("/", getHospitalUpdates);

module.exports = router;
