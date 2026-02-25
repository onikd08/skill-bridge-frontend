import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./actions/auth/auth.action";

export async function proxy(request: NextRequest) {
  let isAuthenticated = false;
  const pathname = request.nextUrl.pathname;
  const userData = await getUser();
  const role = userData?.role;

  if (userData) {
    isAuthenticated = true;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    role === "ADMIN" &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/tutor"))
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (
    role === "STUDENT" &&
    (pathname.startsWith("/admin") || pathname.startsWith("/tutor"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    role === "TUTOR" &&
    (pathname.startsWith("/admin") || pathname.startsWith("/dashboard"))
  ) {
    return NextResponse.redirect(new URL("/tutor", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
    "/tutor",
    "/tutor/:path*",
  ],
};
