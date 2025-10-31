import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import store from "@/store/index";

const publicRoutes = ["/login", "/signup", '/reset-password', "/forgot-password"];

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(path);

  // check auth token
  const authToken = await store?.getState().authToken;

  console.log("Auth token", authToken);

  if (!isPublicRoute && !authToken) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  //   // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    authToken &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
};
