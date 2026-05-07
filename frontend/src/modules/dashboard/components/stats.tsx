import { CalendarCheck } from "lucide-react";

type Props = {
  activeAppointments: number;
};

export default function Stats({ activeAppointments }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
          <CalendarCheck className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Jadwal Aktif</p>
          <h2 className="text-2xl font-bold text-slate-900">
            {activeAppointments}
          </h2>
        </div>
      </div>

    </div>
  );
}