import { NextRequest, NextResponse } from "next/server";
import { getAuthStatus } from "@/lib/auth";

// Define public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/login",
  "/forbidden",
  "/api/auth/login",
  "/api/auth/callback",
  "/api/auth/logout",
  "/_next",
  "/favicon.ico",
  "/robots.txt",
  "/logo.svg",
];

// Define API routes that should return JSON errors instead of redirects
const API_ROUTES = ["/api/"];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => pathname.startsWith(route));
}

function isApiRoute(pathname: string): boolean {
  return API_ROUTES.some(route => pathname.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  try {
    const { role, loggedIn } = await getAuthStatus();

    if (!loggedIn) {
      // Handle unauthenticated requests
      if (isApiRoute(pathname)) {
        // Return JSON error for API routes
        return NextResponse.json(
          { 
            error: "unauthorized", 
            error_description: "Authentication required" 
          },
          { status: 401 }
        );
      } else {
        // Redirect to login for web routes
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

    if (role !== "admin") {
      if (isApiRoute(pathname)) {
        return NextResponse.json(
          { 
            error: "forbidden", 
            error_description: "You must be an admin to access this resource" 
          },
          { status: 403 }
        );
      } else {
        const loginUrl = new URL("/forbidden", request.url);
        return NextResponse.redirect(loginUrl);
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware authentication error:", error);
    
    if (isApiRoute(pathname)) {
      return NextResponse.json(
        { 
          error: "server_error", 
          error_description: "Authentication validation failed" 
        },
        { status: 500 }
      );
    } else {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "auth_error");
      return NextResponse.redirect(loginUrl);
    }
  }
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|logo.svg).*)",
  ],
};
