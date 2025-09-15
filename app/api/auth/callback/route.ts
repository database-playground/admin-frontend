import { clearOAuthState, exchangeCodeForToken, getOAuthState, OAUTH_CONFIG, setAuthToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * OAuth 2.0 Authorization Code Flow Callback Handler
 *
 * This endpoint handles the callback from the OAuth authorization server
 * according to RFC 6749 and RFC 7636 (PKCE).
 *
 * Expected query parameters:
 * - code: Authorization code from the OAuth server
 * - state: State parameter for CSRF protection
 * - error: Error code if authorization failed
 * - error_description: Human-readable error description
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Handle OAuth errors
  if (error) {
    console.error("OAuth authorization error:", error, errorDescription);

    const errorUrl = new URL("/login", request.url);
    errorUrl.searchParams.set("error", error);
    if (errorDescription) {
      errorUrl.searchParams.set("error_description", errorDescription);
    }

    return NextResponse.redirect(errorUrl);
  }

  // Validate required parameters
  if (!code || !state) {
    console.error("Missing required parameters in OAuth callback");

    const errorUrl = new URL("/login", request.url);
    errorUrl.searchParams.set("error", "invalid_request");
    errorUrl.searchParams.set("error_description", "Missing required parameters");

    return NextResponse.redirect(errorUrl);
  }

  try {
    // Retrieve and validate stored OAuth state
    const { state: storedState, codeVerifier } = await getOAuthState();

    if (!storedState || !codeVerifier) {
      console.error("Missing OAuth state or code verifier");

      const errorUrl = new URL("/login", request.url);
      errorUrl.searchParams.set("error", "invalid_request");
      errorUrl.searchParams.set("error_description", "OAuth state not found");

      return NextResponse.redirect(errorUrl);
    }

    // Validate state parameter (CSRF protection)
    if (state !== storedState) {
      console.error("OAuth state mismatch", { state, storedState });

      const errorUrl = new URL("/login", request.url);
      errorUrl.searchParams.set("error", "invalid_request");
      errorUrl.searchParams.set("error_description", "Invalid state parameter");

      return NextResponse.redirect(errorUrl);
    }

    // Exchange authorization code for access token
    const redirectUri = new URL(OAUTH_CONFIG.CALLBACK_PATH, request.url).toString();
    const tokenResponse = await exchangeCodeForToken(code, redirectUri, codeVerifier);

    // Store the access token in cookies
    await setAuthToken(
      tokenResponse.access_token,
      tokenResponse.expires_in,
    );

    // Clear OAuth state cookies
    await clearOAuthState();

    // Redirect to the main application
    const successUrl = new URL("/", request.url);
    return NextResponse.redirect(successUrl);
  } catch (error) {
    console.error("Token exchange failed:", error);

    const errorUrl = new URL("/login", request.url);
    errorUrl.searchParams.set("error", "server_error");
    errorUrl.searchParams.set("error_description", "Failed to exchange authorization code");

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
