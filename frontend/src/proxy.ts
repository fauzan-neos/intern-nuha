import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BOOKING_PAGE_URL, DASHBOARD_PAGE_URL, LOGIN_PAGE_URL, REGISTER_PAGE_URL } from "@/src/constants/constants";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;


    const isAuthPage = pathname === "/" || pathname === REGISTER_PAGE_URL || pathname === LOGIN_PAGE_URL;
    const isProtectedPage = pathname.startsWith(DASHBOARD_PAGE_URL) || pathname.startsWith(BOOKING_PAGE_URL);

    if(token && isAuthPage) {
        return NextResponse.redirect(new URL(DASHBOARD_PAGE_URL, request.url));
    }

    if(!token && isProtectedPage) {
        return NextResponse.redirect(new URL(LOGIN_PAGE_URL, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*"],
}
