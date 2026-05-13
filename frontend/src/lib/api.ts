import { AUTH, BOOKING, DOCTORS, HOSPITAL_UPDATES, LOGOUT, SPECIALIZATIONS, REGISTER, LOGIN } from "@/src/constants/constants";
import { Doctor, Specialization, Booking, HospitalUpdate, CreateBookingPayload } from "@/src/lib/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// AUTH
export async function fetchUser() {
    const res = await fetch(`${API_URL}${AUTH}`, {
        credentials: "include",
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.message);
    return data.data;
}

export async function logout() {
    const res = await fetch(`${API_URL}${LOGOUT}`, {
        method: "POST",
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
}

export async function createUser(fullname: string, email: string, password: string) {
    const res = await fetch(`${API_URL}${REGISTER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
}

export async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_URL}${LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data
}

// DOCTORS & SPECIALIZATIONS
export async function fetchDoctors(): Promise<Doctor[]> {
    const res = await fetch(`${API_URL}${DOCTORS}`);
    const data = await res.json();
    if(!res.ok) throw new Error(data.message);
    return data.data
}

export async function fetchSpecializations(): Promise<Specialization[]> {
    const res = await fetch(`${API_URL}${SPECIALIZATIONS}`);
    const data = await res.json();
    if(!res.ok) throw new Error(data.message);
    return data.data
}

// BOOKINGS
export async function createBooking(bookingData: CreateBookingPayload) {
    const res = await fetch(`${API_URL}${BOOKING}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
}

export async function fetchMyBookings(): Promise<Booking[]> {
    const res = await fetch(`${API_URL}${BOOKING}${AUTH}`, {
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
}

export async function fetchBookingDetail(uuid: string): Promise<Booking> {
    const res = await fetch(`${API_URL}${BOOKING}/${uuid}`, {
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
}

export async function cancelBooking(uuid: string) {
    const res = await fetch(`${API_URL}${BOOKING}/${uuid}/cancel`, {
        method: "PATCH",
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
}

export async function fetchAvailableSlots(doctorId: number, date: string, scheduleId: number) {
    const res = await fetch(`${API_URL}${BOOKING}/slots?doctorId=${doctorId}&date=${date}&scheduleId=${scheduleId}`, {
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
}

// HOSPITAL UPDATES
export async function fetchHospitalUpdates(): Promise<HospitalUpdate[]> {
    const res = await fetch(`${API_URL}${HOSPITAL_UPDATES}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
}
