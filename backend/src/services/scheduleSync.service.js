const prisma = require("../config/prisma");

function getDayName(date) {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return days[date.getDay()];
}

async function syncSchedules() {
    console.log("Starting schedule synchronization...");
    
    try {
        // Ambil semua template
        const templates = await prisma.scheduleTemplate.findMany();
        
        // Tentukan rentang waktu (misal: 14 hari ke depan)
        const daysToSync = 14;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < daysToSync; i++) {
            const targetDate = new Date(today);
            targetDate.setDate(today.getDate() + i);
            
            const dayName = getDayName(targetDate);
            const dateStr = targetDate.toISOString().split('T')[0];

            // Cari template yang cocok dengan hari ini
            const matchingTemplates = templates.filter(t => t.day === dayName);

            for (const template of matchingTemplates) {
                // Cek apakah sudah ada di doctor_schedules
                const existing = await prisma.doctorSchedule.findFirst({
                    where: {
                        doctorId: template.doctorId,
                        date: targetDate,
                        start: template.start,
                        end: template.end
                    }
                });

                if (!existing) {
                    await prisma.doctorSchedule.create({
                        data: {
                            doctorId: template.doctorId,
                            day: template.day,
                            date: targetDate,
                            start: template.start,
                            end: template.end,
                            maxPatient: template.maxPatient,
                            status: "AVAILABLE"
                        }
                    });
                    console.log(`Created schedule for Doctor ID ${template.doctorId} on ${dateStr}`);
                }
            }
        }
        
        console.log("Schedule synchronization completed successfully.");
    } catch (error) {
        console.error("Error during schedule synchronization:", error);
    }
}

module.exports = { syncSchedules };
