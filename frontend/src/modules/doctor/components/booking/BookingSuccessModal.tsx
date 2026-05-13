import { CheckCircle2 } from "lucide-react";

export default function BookingSuccessModal({ closeModal }: { closeModal: () => void }) {
    return (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 px-4 py-8">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
            <CheckCircle2 className="h-10 w-10 text-teal-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Booking Berhasil!</h3>
          <p className="mt-2 text-gray-600">
            Terima kasih telah melakukan pendaftaran. Silakan cek riwayat booking Anda.
          </p>
          <button
            onClick={closeModal}
            className="mt-6 w-full rounded-md bg-teal-700 py-3 font-semibold text-white hover:bg-teal-800"
          >
            Tutup
          </button>
        </div>
      </div>
    )
}