import { 
    Booking, 
    BookingHistoryRow, 
    Doctor,
} from "../lib/types";

// Format baris history booking
export function formatBookingHistoryRows(
  bookingHistories: Booking[],
  doctors: Doctor[]
): BookingHistoryRow[] {
  return bookingHistories.map((booking) => {
    const doctor = doctors.find((item) => item.id === booking.doctorId);
    
    return {
      ...booking,
      status: booking.bookingStatus,
      doctorName: doctor?.name ?? "Unknown Doctor",
      doctorImage: doctor?.image ?? "/doc_sarah.jpg",
      specialization: doctor?.specialization?.name ?? "General Medicine",
      appointmentEndTime: booking.appointmentEndTime,
      // Tampilkan sebagai range di UI jika dibutuhkan
      patientName: booking.patientName ?? "Patient Name",
      patientCode: booking.patientId == null ? "Pasien Baru" : `${booking.patientId}`,
      department: doctor?.department ?? booking.doctor?.department ?? `${doctor?.specialization?.name ?? "General"} Department`,
      room: doctor?.room ?? booking.doctor?.room ?? "Consultation Room",
      location: doctor?.location ?? booking.doctor?.location ?? "MedCare Main Clinic",
      instructions: (booking.instructions as unknown as string[]) ?? [
        "Datang 15 menit lebih awal untuk proses administrasi.",
        "Bawa kartu identitas dan dokumen pendukung.",
        "Bawa daftar obat yang sedang dikonsumsi.",
      ],
    };
  });
}