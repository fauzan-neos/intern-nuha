import { BookingHistoryRow } from "@/src/lib/dummy";
import { Calendar, Clock, MapPin } from "lucide-react";

type Props = {
  appointment: BookingHistoryRow | null;
};

export default function UpcomingAppointment({ appointment }: Props) {
  if (!appointment) {
    return (
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Upcoming Appointment</h2>
        <div className="flex flex-col items-center justify-center py-8 text-slate-400">
          <Calendar className="w-12 h-12 mb-2 opacity-20" />
          <p>No upcoming appointments found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Upcoming Appointment</h2>
      
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-100">
          <img 
            src={appointment.doctorImage} 
            alt={appointment.doctorName}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 truncate">{appointment.doctorName}</h3>
          <p className="text-sm text-teal-600 font-medium mb-3">{appointment.specialization}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{new Date(appointment.appointmentDate).toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{appointment.appointmentTime} - {appointment.appointmentEndTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 md:col-span-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="truncate">{appointment.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}