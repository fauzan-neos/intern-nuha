const express = require("express");
const router = express.Router();
const { 
    createBooking, 
    getMyBookings, 
    getBookingDetail,
    getAvailableSlots
} = require("../controllers/booking.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createBooking);
router.get("/me", authMiddleware, getMyBookings);
router.get("/slots", authMiddleware, getAvailableSlots); // Dipindah ke atas agar tidak bentrok dengan :bookingCode
router.get("/:bookingCode", authMiddleware, getBookingDetail);

module.exports = router;
