import { HospitalUpdate } from "@/src/lib/types";
import Image from "next/image";

type Props = {
  updates: HospitalUpdate[];
};

export default function HospitalUpdates({ updates }: Props) {
  if (!updates || updates.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">Berita Rumah Sakit</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {updates.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-40 w-full bg-slate-100">
              <Image
                src={item.image || "/hospital.jpg"}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="font-bold text-slate-900 line-clamp-1">{item.title}</h3>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}