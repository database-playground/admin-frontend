import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/lib/auth";
import { cookies } from "next/headers";

/**
 * Authentication Middleware for Next.js
 * 
 * This middleware implements server-side authentication according to the
 * OAuth 2.0 for Browser-Based Applications RFC draft.
 * 
 * It runs on every request and:
 * 1. Checks for valid authentication tokens in HttpOnly cookies
 * 2. Redirects unauthenticated users to login page
 * 3. Allows authenticated users to access protected routes
 * 4. Handles public routes without authentication
 */

// Define public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/login",
  "/api/auth/login",
  "/api/auth/callback",
  "/api/auth/logout",
  "/_next",
  "/favicon.ico",
  "/robots.txt",
  "/logo.svg",
];

// Define API routes that should return JSON errors instead of redirects
const API_ROUTES = ["/api/", "/query"];

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
    // Check for authentication session
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    
    if (!session.isLoggedIn || !session.access_token) {
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

    // Add auth token to request headers for downstream consumption
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-auth-token", session.access_token);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

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
