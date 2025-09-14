import { buildAuthorizeUrl, generateCodeVerifier, generateState, OAUTH_CONFIG, setOAuthState } from "@/lib/auth";
import { redirectIfAuthenticated } from "@/lib/auth.rsc";
import { NextRequest, NextResponse } from "next/server";

/**
 * OAuth 2.0 Authorization Code Flow with PKCE - Login Initiation
 *
 * This endpoint initiates the OAuth 2.0 authorization flow according to
 * RFC 6749 and RFC 7636 (PKCE for OAuth Public Clients).
 *
 * The flow follows these steps:
 * 1. Generate PKCE code verifier and challenge
 * 2. Generate state parameter for CSRF protection
 * 3. Store state and code verifier in secure HttpOnly cookies
 * 4. Redirect user to authorization server
 */
export async function GET(request: NextRequest) {
  // Check if user is already authenticated
  await redirectIfAuthenticated();

  try {
    // Generate PKCE parameters
    const codeVerifier = generateCodeVerifier();
    const state = generateState();

    // Store OAuth state and code verifier in secure cookies
    await setOAuthState(state, codeVerifier);

    // Build the callback URI
    const callbackUri = new URL(OAUTH_CONFIG.CALLBACK_PATH, request.url).toString();

    // Build authorization URL with PKCE parameters
    const authorizeUrl = await buildAuthorizeUrl(callbackUri, state, codeVerifier);

    // Redirect to authorization server
    return NextResponse.redirect(authorizeUrl);
  } catch (error) {
    console.error("Login initiation failed:", error);

    const errorUrl = new URL("/login", request.url);
    errorUrl.searchParams.set("error", "server_error");
    errorUrl.searchParams.set("error_description", "Failed to initiate login");

    return NextResponse.redirect(errorUrl);
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function POST() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function PUT() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function DELETE() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function PATCH() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
