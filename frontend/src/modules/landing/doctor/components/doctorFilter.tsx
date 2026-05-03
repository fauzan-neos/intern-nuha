"use client";

type Props = {
  search: string;
  setSearch: (val: string) => void;
};

export default function DoctorFilter({ search, setSearch }: Props) {
  return (
    <div className="flex gap-4 mt-6">
      
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search doctor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border px-4 py-2 rounded-md outline-1 text-gray-600"
      />

      {/* FILTER BUTTON */}
      <button className="bg-blue-600 text-white px-4 rounded-md">
        Apply
      </button>
    </div>
  );
}