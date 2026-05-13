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

    { name: 'Dermatology', code: 'DERM', description: 'Perawatan kesehatan kulit, rambut, dan kuku.' },
    { name: 'Orthopedics', code: 'ORTHO', description: 'Penanganan tulang, sendi, dan otot.' },
    { name: 'Ophthalmology', code: 'OPHT', description: 'Spesialis kesehatan mata dan penglihatan.' },
    { name: 'Psychiatry', code: 'PSY', description: 'Layanan kesehatan mental dan emosional.' },
    { name: 'Obstetrics & Gynecology', code: 'OBGYN', description: 'Kesehatan reproduksi wanita dan kehamilan.' },

    { name: 'Urology', code: 'URO', description: 'Penanganan saluran kemih dan reproduksi pria.' },
    { name: 'Pulmonology', code: 'PUL', description: 'Spesialis paru-paru dan sistem pernapasan.' },
    { name: 'Endocrinology', code: 'ENDO', description: 'Gangguan hormon dan metabolisme tubuh.' },
    { name: 'Gastroenterology', code: 'GAST', description: 'Spesialis sistem pencernaan.' },
    { name: 'Nephrology', code: 'NEPH', description: 'Penanganan penyakit ginjal.' },

    { name: 'Oncology', code: 'ONC', description: 'Diagnosis dan pengobatan kanker.' },
    { name: 'Hematology', code: 'HEMA', description: 'Gangguan darah dan sistem hematologi.' },
    { name: 'Rheumatology', code: 'RHEU', description: 'Penyakit sendi dan autoimun.' },
    { name: 'Allergy & Immunology', code: 'ALL', description: 'Penanganan alergi dan sistem imun.' },
    { name: 'Infectious Disease', code: 'INF', description: 'Spesialis penyakit infeksi dan menular.' },

    { name: 'Radiology', code: 'RAD', description: 'Pemeriksaan pencitraan medis dan radiologi.' },
    { name: 'Anesthesiology', code: 'ANES', description: 'Layanan anestesi dan manajemen nyeri.' },
    { name: 'Plastic Surgery', code: 'PLAS', description: 'Bedah rekonstruksi dan estetika.' },
    { name: 'ENT (Otolaryngology)', code: 'ENT', description: 'Kesehatan telinga, hidung, dan tenggorokan.' },
    { name: 'Physical Medicine & Rehabilitation', code: 'PMR', description: 'Rehabilitasi medis dan terapi fisik.' },

    { name: 'Emergency Medicine', code: 'EMR', description: 'Penanganan kondisi darurat medis.' },
    { name: 'Family Medicine', code: 'FAM', description: 'Perawatan kesehatan keluarga menyeluruh.' },
    { name: 'Sports Medicine', code: 'SPORT', description: 'Cedera olahraga dan kebugaran fisik.' },
    { name: 'Geriatrics', code: 'GER', description: 'Perawatan kesehatan lansia.' },
    { name: 'Nutrition & Dietetics', code: 'NUT', description: 'Konsultasi nutrisi dan pola makan sehat.' },
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
  await prisma.booking.deleteMany({});
  await prisma.patient.deleteMany({});
  await prisma.doctorSchedule.deleteMany({});
  await prisma.scheduleTemplate.deleteMany({});
  await prisma.doctor.deleteMany({});

  // Buat Data Dokter
  const firstNames = ['Sarah', 'Marcus', 'Eko', 'Linda', 'Ahmad', 'Jessica', 'Budi', 'Siti', 'Andi', 'Rina', 'Dewi', 'Agus', 'Maya', 'Rudi', 'Nina', 'Fajar', 'Lina', 'Hendra', 'Sari', 'Tono', 'Yulia', 'Rizky', 'Dina', 'Bayu', 'Mira', 'Eka', 'Ratna', 'Wawan', 'Intan', 'Fauzan', 'Siska', 'Hadi', 'Lia', 'Rian', 'Nadia', 'Doni', 'Vina', 'Arif', 'Sinta', 'Gilang', 'Melly'];
  const lastNames = ['Wijaya', 'Holloway', 'Prasetyo', 'Kusuma', 'Fauzi', 'Tan', 'Santoso', 'Lestari', 'Saputra', 'Putri', 'Gunawan', 'Nugroho', 'Yuliana', 'Hidayat', 'Suryanto', 'Dewi', 'Kurniawan', 'Utami', 'Wibowo', 'Ramadhan'];
  const images = ['/doc_sarah.jpg', '/doc_marcus.jpg', '/doc_eko.jpg'];

  const usedEmployeeCodes = new Set();
  
  for (let i = 1; i <= 70; i++) {
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `Dr. ${fName} ${lName}`;
    const email = `doctor${i}@medcare.com`;
    const spec = specializations[Math.floor(Math.random() * specializations.length)];
    const specCode = specializations.find(s => s.name === spec.name).code;

    let employeeCode = "";
    const firstChars = fName.toUpperCase().replace(/[^A-Z]/g, "");
    const lastChars = lName.toUpperCase().replace(/[^A-Z]/g, "");

    // coba semua kombinasi 2 huruf
    outer:
    for (const fChar of firstChars) {
      for (const lChar of lastChars) {
        const candidate = `${fChar}${lChar}`;

        if (!usedEmployeeCodes.has(candidate)) {
          employeeCode = candidate;
          break outer;
        }
      }
    }

    // fallback jika semua kombinasi habis
    if (!employeeCode) {
      throw new Error(
        `Tidak bisa generate employee code unik untuk ${fullName}`
      );
    }

    usedEmployeeCodes.add(employeeCode);

    const createdDoc = await prisma.doctor.upsert({
      where: { email: email },
      update: {},
      create: {
        name: fullName,
        employeeCode : employeeCode,
        email: email,
        experienceYears: Math.floor(Math.random() * 20) + 1,
        rating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)),
        specializationId: specMap[specCode],
        image: images[Math.floor(Math.random() * images.length)],
        department: spec.name,
        room: `${String.fromCharCode(65 + (i % 4))}-${100 + i}`,
        location: `Lantai ${Math.floor(i / 20) + 1}, Gedung ${String.fromCharCode(65 + (i % 3))}`
      },
    });

    // Buat Jadwal Rutin (Template)
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const randomDay1 = days[Math.floor(Math.random() * days.length)];
    const randomDay2 = days[(days.indexOf(randomDay1) + 2) % days.length];
    const randomDay3 = days[(days.indexOf(randomDay1) + 4) % days.length];

    await prisma.scheduleTemplate.createMany({
      data: [
        { doctorId: createdDoc.id, day: randomDay1, start: '09:00', end: '14:00', maxPatient: 10 },
        { doctorId: createdDoc.id, day: randomDay2, start: '10:00', end: '15:00', maxPatient: 10 },
        { doctorId: createdDoc.id, day: randomDay3, start: '10:00', end: '16:00', maxPatient: 10 },
      ]
    });
  }

  // Buat Update Rumah Sakit
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
