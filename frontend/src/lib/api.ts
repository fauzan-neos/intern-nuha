import { Doctor, Specialization, Booking, HospitalUpdate, CreateBookingPayload } from "./types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// AUTH
export async function fetchUser() {
    const res = await fetch(`${API_URL}/me`, {
        credentials: "include",
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.message);
    return data.data;
}

export async function logout() {
    const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
}

export async function createUser(fullname: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/register`, {
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
    const res = await fetch(`${API_URL}/login`, {
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
    const res = await fetch(`${API_URL}/api/doctors`);
    const data = await res.json();
    if(!res.ok) throw new Error(data.message);
    return data.data
}

export async function fetchSpecializations(): Promise<Specialization[]> {
    const res = await fetch(`${API_URL}/api/specializations`);
    const data = await res.json();
    if(!res.ok) throw new Error(data.message);
    return data.data
}

// BOOKINGS
export async function createBooking(bookingData: CreateBookingPayload) {
    const res = await fetch(`${API_URL}/api/bookings`, {
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
    const res = await fetch(`${API_URL}/api/bookings/me`, {
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
}

export async function fetchBookingDetail(uuid: string): Promise<Booking> {
    const res = await fetch(`${API_URL}/api/bookings/${uuid}`, {
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
}

export async function cancelBooking(uuid: string) {
    const res = await fetch(`${API_URL}/api/bookings/${uuid}/cancel`, {
        method: "PATCH",
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
}

export async function fetchAvailableSlots(doctorId: number, date: string, scheduleId: number) {
    const res = await fetch(`${API_URL}/api/bookings/slots?doctorId=${doctorId}&date=${date}&scheduleId=${scheduleId}`, {
        credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
}

// HOSPITAL UPDATES
export async function fetchHospitalUpdates(): Promise<HospitalUpdate[]> {
    const res = await fetch(`${API_URL}/api/hospital-updates`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
}
