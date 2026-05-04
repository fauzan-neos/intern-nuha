import Doctor from "@/src/modules/landing/doctor"
import { Suspense } from "react";

export default function DoctorPage() {
    return (
        <Suspense fallback={null}>
            <Doctor/>
        </Suspense>
    )
}
