import { Info } from "lucide-react";

type Props = {
  instructions: string[];
};

export default function PreAppointmentInstructions({ instructions }: Props) {
  return (
    <section className="rounded-lg border border-teal-200 bg-teal-50 p-6 text-sm text-gray-700">
      <div className="mb-3 flex items-center gap-2 font-semibold text-teal-700">
        <Info className="size-5" />
        Instruksi Pra-Janji Temu
      </div>
      <ul className="list-disc space-y-2 pl-5">
        {instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ul>
    </section>
  );
}
