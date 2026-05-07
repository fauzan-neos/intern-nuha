const prisma = require("../config/prisma");

async function getAllUpdates() {
    return await prisma.hospitalUpdate.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

module.exports = { getAllUpdates };
