import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("__session");

  // Protect /admin, /checkout, and /orders
  if (
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/checkout") ||
    request.nextUrl.pathname.startsWith("/orders")
  ) {
    if (!session) {
      // Redirect to /auth if no session
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    // Note: We don't verify the session token explicitly here using firebase-admin
    // because firebase-admin SDK requires Node.js runtime, but middleware runs in Edge.
    // Full role-based verification should happen inside the /admin components or API routes.
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/checkout/:path*",
    "/orders/:path*"
  ],
};
