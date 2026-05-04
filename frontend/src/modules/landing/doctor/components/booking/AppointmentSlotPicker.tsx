import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AppointmentSlot } from "@/src/lib/dummy";
import { BookingFormValues } from "@/src/modules/landing/doctor/utils/validation";

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
  return (
    <div>
      <div className="mb-3">
        <h4 className="text-sm font-semibold">Pilih jadwal hari ini</h4>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {slots.map((slot) => {
          const isFull = slot.remaining <= 0;
          const isSelected = selectedSlot === slot.start;

          return (
            <label
              key={slot.start}
              className={`rounded-md border p-3 text-sm ${
                isFull
                  ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
                  : isSelected
                    ? "cursor-pointer border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-100"
                    : "cursor-pointer border-blue-100 hover:border-teal-600 hover:bg-teal-50"
              }`}
            >
              <input
                type="radio"
                value={slot.start}
                disabled={isFull}
                className="sr-only"
                {...register("slotStart")}
              />
              <span className="flex items-center justify-between gap-2 font-semibold">
                {slot.label}
                {isSelected && (
                  <span className="rounded-full bg-teal-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">
                    Dipilih
                  </span>
                )}
              </span>
              {isFull && (
                <span className="mt-1 block text-xs">Tidak tersedia</span>
              )}
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
