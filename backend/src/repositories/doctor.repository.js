const prisma = require("../config/prisma");

async function getAllDoctors() {
    return await prisma.doctor.findMany({
        include: {
            specialization: true,
            schedules: true
        }
    });
}

async function getAllSpecialization() {
    return await prisma.specialization.findMany();
}

module.exports = { getAllDoctors, getAllSpecialization }