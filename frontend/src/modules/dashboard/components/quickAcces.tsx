import { Access } from "@/src/lib/types";

type Props = {
  items: Access[];
};

export default function QuickAccess({ items }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">Akses Cepat</h2>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            className="bg-white border border-slate-200 p-4 rounded-2xl text-center shadow-sm hover:bg-slate-50 transition text-slate-700 font-medium text-sm"
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}