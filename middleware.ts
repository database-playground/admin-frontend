import { getAuthStatus, getAuthToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

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

  const token = await getAuthToken();
  if (!token) {
    return unauthorized(request);
  }

  try {
    const { role, loggedIn } = await getAuthStatus(token);

    if (!loggedIn) {
      return unauthorized(request);
    }

    if (role !== "admin") {
      return forbidden(request);
    }
  } catch (error) {
    console.error("Middleware authentication error:", error);
    return serverError(request);
  }

  return NextResponse.next();
}

function unauthorized(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Handle unauthenticated requests
  if (isApiRoute(pathname)) {
    // Return JSON error for API routes
    return NextResponse.json(
      {
        error: "unauthorized",
        error_description: "Authentication required",
      },
      { status: 401 },
    );
  }

  // Redirect to login for web routes
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

function forbidden(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (isApiRoute(pathname)) {
    return NextResponse.json(
      {
        error: "forbidden",
        error_description: "You must be an admin to access this resource",
      },
      { status: 403 },
    );
  }

  const loginUrl = new URL("/forbidden", request.url);
  return NextResponse.redirect(loginUrl);
}

function serverError(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (isApiRoute(pathname)) {
    return NextResponse.json(
      {
        error: "server_error",
        error_description: "Could not validate authentication",
      },
      { status: 500 },
    );
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("error", "server_error");
  return NextResponse.redirect(loginUrl);
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
