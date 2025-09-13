import { clearAuthToken, getAuthToken, revokeToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * OAuth 2.0 Token Revocation - Logout Handler
 *
 * This endpoint handles user logout according to RFC 7009 (OAuth 2.0 Token Revocation).
 *
 * The logout process:
 * 1. Retrieve the access token from HttpOnly cookie
 * 2. Revoke the token at the authorization server
 * 3. Clear the authentication cookie
 * 4. Redirect to login page
 */
export async function POST() {
  try {
    // Get the current access token
    const token = await getAuthToken();

    // If there's a token, revoke it at the authorization server
    if (token) {
      try {
        await revokeToken(token);
      } catch (error) {
        // Log the error but continue with logout process
        // According to RFC 7009, the client should continue even if revocation fails
        console.error("Token revocation failed:", error);
      }
    }

    // Clear the authentication cookie
    await clearAuthToken();

    // Return success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Logout failed:", error);

    // Even if logout fails, clear the local cookie
    try {
      await clearAuthToken();
    } catch (clearError) {
      console.error("Failed to clear auth cookie:", clearError);
    }

    return NextResponse.json(
      {
        error: "server_error",
        error_description: "Logout failed, but local session cleared",
      },
      { status: 500 },
    );
  }
}

/**
 * GET method for logout (for simple link-based logout)
 */
export async function GET(request: NextRequest) {
  try {
    // Get the current access token
    const token = await getAuthToken();

    // If there's a token, revoke it at the authorization server
    if (token) {
      try {
        await revokeToken(token);
      } catch (error) {
        console.error("Token revocation failed:", error);
      }
    }

    // Clear the authentication cookie
    await clearAuthToken();

    // Redirect to login page
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("message", "logged_out");

    return NextResponse.redirect(loginUrl);
  } catch (error) {
    console.error("Logout failed:", error);

    // Even if logout fails, clear the local cookie and redirect
    try {
      await clearAuthToken();
    } catch (clearError) {
      console.error("Failed to clear auth cookie:", clearError);
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "logout_failed");

    return NextResponse.redirect(loginUrl);
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function PUT() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function DELETE() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function PATCH() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
