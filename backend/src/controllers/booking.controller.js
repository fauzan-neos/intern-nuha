const { 
    createBookingService, 
    getMyBookingsService, 
    getBookingDetailService,
    generateAvailableSlots,
    cancelBookingService
} = require("../services/booking.service");

async function createBooking(req, res) {
    try {
        const userId = req.user.id;
        const booking = await createBookingService(userId, req.body);
        res.status(201).json({
            status: "success",
            message: "Booking berhasil dibuat",
            data: booking
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
}

async function getMyBookings(req, res) {
    try {
        const userId = req.user.id;
        const bookings = await getMyBookingsService(userId);
        res.json({
            status: "success",
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

async function getBookingDetail(req, res) {
    try {
        const { uuid } = req.params;
        const booking = await getBookingDetailService(uuid);
        res.json({
            status: "success",
            data: booking
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: error.message
        });
    }
}

async function cancelBooking(req, res) {
    try {
        const { uuid } = req.params;
        const userId = req.user.id;
        const booking = await cancelBookingService(uuid, userId);
        res.json({
            status: "success",
            message: "Booking berhasil dibatalkan",
            data: booking
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
}

async function getAvailableSlots(req, res) {
    try {
        const { doctorId, date, scheduleId } = req.query;
        const slots = await generateAvailableSlots(
            parseInt(doctorId), 
            date, 
            parseInt(scheduleId)
        );
        res.json({ status: "success", data: slots });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

module.exports = {
    getAvailableSlots,
    createBooking,
    getMyBookings,
    getBookingDetail,
    cancelBooking
};
