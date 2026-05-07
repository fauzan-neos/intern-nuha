const prisma = require('./src/config/prisma');

async function check() {
  try {
    const users = await prisma.user.findMany();
    console.log('Users:', users.map(u => ({id: u.id, email: u.email})));
    const patients = await prisma.patient.findMany();
    console.log('Patients:', patients);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

check();
