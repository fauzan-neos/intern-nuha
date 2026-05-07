const { getAllUpdates } = require("../repositories/hospital.repository");

async function getHospitalUpdates(req, res) {
    try {
        const updates = await getAllUpdates();
        res.json({
            status: "success",
            data: updates
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

module.exports = { getHospitalUpdates };
