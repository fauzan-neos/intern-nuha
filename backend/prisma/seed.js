const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const bcrypt = require('bcrypt');

async function main() {
  console.log('Sedang mengisi data awal massal...');

  const specializations = [
    { name: 'General Medicine', code: 'GEN', description: 'Layanan kesehatan umum untuk segala usia.' },
    { name: 'Cardiology', code: 'CARD', description: 'Spesialis jantung dan pembuluh darah.' },
    { name: 'Pediatrics', code: 'PED', description: 'Layanan kesehatan khusus bayi dan anak-anak.' },
    { name: 'Dentistry', code: 'DENT', description: 'Perawatan kesehatan gigi dan mulut.' },
    { name: 'Neurology', code: 'NEU', description: 'Spesialis sistem saraf dan otak.' },
  ];

  const specMap = {};
  for (const s of specializations) {
    const created = await prisma.specialization.upsert({
      where: { code: s.code },
      update: {},
      create: s,
    });
    specMap[s.code] = created.id;
  }

  const hashedPassword = await bcrypt.hash('12345678', 8);
  await prisma.user.upsert({
    where: { email: 'admin@medcare.com' },
    update: {},
    create: {
      fullname: 'Admin',
      email: 'admin@medcare.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Cleanup before seeding to avoid unique constraint issues with employeeCode and email
  await prisma.doctorSchedule.deleteMany({});
  await prisma.doctor.deleteMany({});

  // 3. Buat Data Dokter Massal
  const doctors = [
    { name: 'Dr. Sarah Wijaya', code: 'SW', email: 'sarah.wijaya@medcare.com', spec: 'CARD', exp: 12, rate: 4.9, img: '/doc_sarah.jpg', dept: 'Cardiology', room: 'A-101', loc: 'Lantai 1, Gedung Utama' },
    { name: 'Dr. Marcus Holloway', code: 'MH', email: 'marcus.h@medcare.com', spec: 'GEN', exp: 8, rate: 4.7, img: '/doc_marcus.jpg', dept: 'General Medicine', room: 'B-205', loc: 'Lantai 2, Gedung B' },
    { name: 'Dr. Eko Prasetyo', code: 'EP', email: 'eko.p@medcare.com', spec: 'PED', exp: 15, rate: 5.0, img: '/doc_eko.jpg', dept: 'Pediatrics', room: 'C-302', loc: 'Lantai 3, Gedung C' },
    { name: 'Dr. Linda Kusuma', code: 'LK', email: 'linda.k@medcare.com', spec: 'DENT', exp: 5, rate: 4.5, img: '/doc_marcus.jpg', dept: 'Dentistry', room: 'A-105', loc: 'Lantai 1, Gedung Utama' },
    { name: 'Dr. Ahmad Fauzi', code: 'AF', email: 'ahmad.f@medcare.com', spec: 'NEU', exp: 10, rate: 4.8, img: '/doc_sarah.jpg', dept: 'Neurology', room: 'D-401', loc: 'Lantai 4, Gedung D' },
    { name: 'Dr. Jessica Tan', code: 'JT', email: 'jessica.t@medcare.com', spec: 'CARD', exp: 7, rate: 4.6, img: '/doc_sarah.jpg', dept: 'Cardiology', room: 'A-102', loc: 'Lantai 1, Gedung Utama' },
  ];

  for (const d of doctors) {
    const createdDoc = await prisma.doctor.upsert({
      where: { email: d.email },
      update: {},
      create: {
        name: d.name,
        employeeCode: d.code,
        email: d.email,
        experienceYears: d.exp,
        rating: d.rate,
        specializationId: specMap[d.spec],
        image: d.img,
        department: d.dept,
        room: d.room,
        location: d.loc
      },
    });

    // 4. Buat Jadwal Rutin (Master Schedule)
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const randomDay1 = days[Math.floor(Math.random() * days.length)];
    const randomDay2 = days[(days.indexOf(randomDay1) + 2) % days.length];
    const randomDay3 = days[(days.indexOf(randomDay1) + 4) % days.length];

    // Menggunakan create karena tidak ada field unik di DoctorSchedule selain ID
    await prisma.doctorSchedule.createMany({
      data: [
        { doctorId: createdDoc.id, day: randomDay1, start: '09:00', end: '14:00', status: 'AVAILABLE', maxPatient: 10 },
        { doctorId: createdDoc.id, day: randomDay2, start: '10:00', end: '15:00', status: 'AVAILABLE', maxPatient: 10 },
        { doctorId: createdDoc.id, day: randomDay3, start: '10:00', end: '16:00', status: 'AVAILABLE', maxPatient: 10 },
      ]
    });
  }

  // 5. Buat Update Rumah Sakit
  await prisma.hospitalUpdate.deleteMany({}); // Bersihkan dulu agar tidak duplikat saat seeding ulang
  await prisma.hospitalUpdate.createMany({
    data: [
      { title: 'New MRI Facility', description: 'Fasilitas MRI baru sekarang tersedia.', image: '/hospital.jpg' },
      { title: 'Vaccination Drive', description: 'Program vaksinasi anak dimulai minggu depan.', image: '/hospital-building.jpg' },
      { title: 'Dental Health Month', description: 'Diskon 20% untuk scaling gigi.', image: '/hospital_auth.jpg' },
    ]
  });

  console.log('Seeding massal selesai dengan sukses!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
