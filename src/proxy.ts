import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import userService from "./services/user/user.service";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  let isAuthenticated = false;
  const pathname = request.nextUrl.pathname;
  const { data } = await userService.getUserSession();
  const role = data?.user?.role;

  if (data) {
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

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

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
