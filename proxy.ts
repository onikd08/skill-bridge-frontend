import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./src/actions/auth/auth.action";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userData = await getUser();
  const role = userData?.role;
  const isAuthenticated = !!userData;

  // 🔓 Public routes
  const isPublicRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // ✅ If logged in user tries to visit login/register
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ If NOT logged in and trying to access protected route
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔐 Role based restrictions
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
    "/dashboard/:path*",
    "/admin/:path*",
    "/tutor/:path*",
    "/login",
    "/register",
  ],
};
