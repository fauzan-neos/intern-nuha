const { getAllDoctors, getAllSpecialization } = require("../repositories/doctor.repository");

async function getDoctors(req, res) {
    try {
        const doctors = await getAllDoctors();
        res.json({
            status: "success",
            data: doctors
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }    
}

async function getSpecializations(req, res) {
    try {
        const specs = await getAllSpecialization();
        res.json({
            status: "success",
            data: specs
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

module.exports = { getDoctors, getSpecializations }