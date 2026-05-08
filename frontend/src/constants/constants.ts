import { Access } from "../lib/types";

export const quickAccess: Access[] = [
  { id: 1, title: "Rekam Medis" },
  { id: 2, title: "Penagihan & Pembayaran" }
];

export const LOGIN_PAGE_URL = "/login";
export const REGISTER_PAGE_URL = "/register";
export const LOGOUT_PAGE_URL = "/logout";
export const DASHBOARD_PAGE_URL = "/dashboard";
export const BOOKING_PAGE_URL = "/booking";
export const DOCTORS_PAGE_URL = "/doctor";

// API Endpoints
export const LOGIN = "/login";
export const REGISTER = "/register";
export const LOGOUT = "/logout";
export const AUTH = "/me";
export const DOCTORS = "/api/doctors";
export const SPECIALIZATIONS = "/api/specializations";
export const BOOKING = "/api/bookings";
export const HOSPITAL_UPDATES = "/api/hospital-updates";
