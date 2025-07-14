import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { RouteMatcher } from "@/lib/routeMatcher";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const matcher = new RouteMatcher(req, token);
    const result = matcher.match();

    if (process.env.NODE_ENV === "development") {
      console.log("Route Debug:", {
        ...matcher.getDebugInfo(),
        result,
      });
    }

    if (result.shouldRedirect && result.redirectUrl) {
      return NextResponse.redirect(new URL(result.redirectUrl, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
