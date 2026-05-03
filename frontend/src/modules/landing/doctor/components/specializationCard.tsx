"use client";

type Props = {
  name: string;
  onClick: () => void;
};

export default function SpecializationCard({ name, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="border rounded-xl p-6 cursor-pointer hover:shadow-md transition hover:bg-blue-50"
    >
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-500 mt-1">
        View available doctors
      </p>
    </div>
  );
}