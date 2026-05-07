import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AppointmentSlot } from "@/src/lib/types";
import { BookingFormValues } from "@/src/modules/landing/doctor/utils/validation";
import { groupSlotsIntoSessions } from "@/src/utils/doctorHelper";

type Props = {
  slots: AppointmentSlot[];
  selectedSlot?: string;
  register: UseFormRegister<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
};

export default function AppointmentSlotPicker({
  slots,
  selectedSlot,
  register,
  errors,
}: Props) {
  const sessions = groupSlotsIntoSessions(slots);

  return (
    <div>
      <div className="mb-3">
        <h4 className="text-sm font-semibold">Pilih Sesi Kunjungan</h4>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sessions.map((session) => {
          const isFull = session.totalRemaining <= 0;
          const isSelected = selectedSlot === session.startTime;

          return (
            <label
              key={session.sessionName}
              className={`relative flex flex-col rounded-xl border p-4 transition-all ${
                isFull
                  ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
                  : isSelected
                    ? "cursor-pointer border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-100 shadow-sm"
                    : "cursor-pointer border-blue-100 bg-white hover:border-teal-600 hover:bg-teal-50"
              }`}
            >
              <input
                type="radio"
                value={session.startTime}
                disabled={isFull}
                className="sr-only"
                {...register("slotStart")}
              />
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-teal-700' : 'text-gray-400'}`}>
                  {session.sessionName}
                </span>
                {isSelected && (
                  <span className="rounded-full bg-teal-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Dipilih
                  </span>
                )}
              </div>
              
              <span className="text-lg font-bold text-gray-900">
                {session.timeRange}
              </span>

              <div className="mt-3 flex items-center justify-between">
                <span className={`text-xs font-medium ${isFull ? 'text-red-500' : 'text-teal-600'}`}>
                  {isFull ? "Kuota Habis" : `Tersedia ${session.totalRemaining} Kuota`}
                </span>
              </div>
            </label>
          );
        })}
      </div>
      {errors.slotStart && (
        <p className="mt-2 text-xs text-red-600">{errors.slotStart.message}</p>
      )}
    </div>
  );
}
