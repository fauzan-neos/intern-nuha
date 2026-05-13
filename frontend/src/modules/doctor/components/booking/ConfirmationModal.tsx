import { Doctor } from "@/src/lib/types";
import { ArrowLeft } from "lucide-react";
import { BookingFormValues } from "@/src/modules/doctor/utils/validation";

type ConfirmationModalProps = {
    doctor: Doctor;
    formData: BookingFormValues;
    isPending: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export default function ConfirmationModal({
    doctor,
    formData,
    isPending,
    onClose,
    onSubmit
}: ConfirmationModalProps) {
    return (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 px-4 py-8">
            <div className="max-h-full w-full max-w-2xl overflow-y-auto rounded-lg bg-white text-gray-900 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                <ArrowLeft className="h-4 w-4" />
                Kembali
                </button>
                <h3 className="text-xl font-bold">Konfirmasi Booking</h3>
                <div className="w-10"></div>
            </div>

            <div className="rounded-xl bg-slate-50 p-6">
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-900">Detail Kunjungan</h4>
                <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                    <div>
                    <p className="text-xs font-bold text-gray-800">Nama Dokter</p>
                    <p className="font-bold text-teal-700">{doctor.name}</p>
                    <p className="text-xs font-medium text-gray-700">{doctor.specialization?.name}</p>
                    </div>
                </div>
                <div className="space-y-3">
                    <div>
                    <p className="text-xs font-bold text-gray-800">Tanggal Kunjungan</p>
                    <p className="font-bold text-teal-700">{formData.appointmentDate ? new Date(formData.appointmentDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : "-"}</p>
                    </div>
                    <div>
                    <p className="text-xs font-bold text-gray-800">Waktu Kunjungan</p>
                    <p className="font-bold text-teal-700">{formData.slotStart} WIB</p>
                    </div>
                </div>
                </div>
            </div>

            <div className="p-6 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Detail Pasien</h4>
                    <div className="mt-3 space-y-1">
                    <p className="text-xs font-bold text-gray-800">Nama Lengkap</p>
                    <p className="font-bold text-teal-700">{formData.patientName}</p>
                    </div>
                </div>
                </div>

                <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-6">
                <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Info Kontak</h4>
                    <div className="space-y-3">
                    <div>
                        <p className="text-xs font-bold text-gray-700">Email</p>
                        <p className="font-semibold text-teal-700">{formData.email}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-800">No. Telepon</p>
                        <p className="font-semibold text-teal-700">{formData.phone}</p>
                    </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">Alasan Kunjungan</h4>
                    <div>
                    <p className="text-xs font-bold text-gray-800">Keluhan</p>
                    <p className="font-semibold text-teal-700">{formData.complaint}</p>
                    </div>
                </div>
                </div>

                <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-md border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                >
                    Ubah Data
                </button>
                <button
                    type="button"
                    disabled={isPending}
                    onClick={onSubmit}
                    className="flex-2 rounded-md bg-teal-700 py-3 font-semibold text-white hover:bg-teal-800 disabled:bg-teal-300"
                >
                    {isPending ? "Memproses..." : "Konfirmasi & Kirim"}
                </button>
                </div>
            </div>
            </div>
        </div>
    )
}