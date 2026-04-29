import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;


    const isAuthPage = pathname === "/" || pathname === "/register" || pathname === "/login";
    const isDashboardPage = pathname.startsWith("/dashboard");

    if(token && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if(!token && isDashboardPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*"],
}
