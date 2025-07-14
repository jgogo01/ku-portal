import { NextRequest } from "next/server";
import { JWT } from "next-auth/jwt";
import { isIgnoredPath, isProtectedRoute } from "@/config/route";

export interface RouteResult {
  shouldRedirect: boolean;
  redirectUrl?: string;
  reason?: string;
}

export class RouteMatcher {
  private req: NextRequest;
  private token: JWT | null;

  constructor(req: NextRequest, token: JWT | null) {
    this.req = req;
    this.token = token;
  }

  public match(): RouteResult {
    const pathname = this.req.nextUrl.pathname;
    const isAuth = !!this.token;

    if (isIgnoredPath(pathname)) {
      return { shouldRedirect: false };
    }

    if (isProtectedRoute(pathname) && !isAuth) {
      return {
        shouldRedirect: true,
        redirectUrl: "/login",
        reason: "Authentication required",
      };
    }

    if (pathname.startsWith("/auth/") && isAuth) {
      return {
        shouldRedirect: true,
        redirectUrl: "/",
        reason: "Already authenticated",
      };
    }

    return { shouldRedirect: false };
  }

  public getDebugInfo() {
    return {
      pathname: this.req.nextUrl.pathname,
      isAuth: !!this.token,
      userEmail: this.token?.email,
    };
  }
}
