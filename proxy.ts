import { getUser } from "@/actions/auth/auth.action";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log({ pathname });
  // read the auth token directly from the request cookies
  const userInfo = await getUser();
  console.log(userInfo);
  const isAuthenticated = userInfo !== null;
  const isPublicRoute = pathname === "/login" || pathname === "/register";

  if (
    userInfo.role === "STUDENT" &&
    (pathname.startsWith("/admin") || pathname.startsWith("/tutor"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    userInfo.role === "TUTOR" &&
    (pathname.startsWith("/admin") || pathname.startsWith("/dashboard"))
  ) {
    return NextResponse.redirect(new URL("/tutor", request.url));
  }

  if (
    userInfo.role === "ADMIN" &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/tutor"))
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // logged‑in users shouldn’t see the login/register pages
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/tutor");

  if (!isAuthenticated && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
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
