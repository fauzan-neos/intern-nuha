import Doctor from "@/src/modules/doctor"
import { Suspense } from "react";

export default function DoctorPage() {
    return (
        <Suspense fallback={null}>
            <Doctor/>
        </Suspense>
    )
}
