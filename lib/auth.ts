import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import crypto from "crypto";

// Constants for OAuth 2.0 PKCE flow
export const OAUTH_CONFIG = {
  AUTHORIZE_URL: "/api/auth/v2/authorize/google",
  TOKEN_URL: "/api/auth/v2/token",
  REVOKE_URL: "/api/auth/v2/revoke",
  CALLBACK_PATH: "/api/auth/callback",
  SESSION_COOKIE_NAME: "auth_session",
  STATE_COOKIE_NAME: "oauth_state",
  CODE_VERIFIER_COOKIE_NAME: "code_verifier",
  COOKIE_MAX_AGE: 8 * 60 * 60, // 8 hours in seconds
} as const;

// Iron Session configuration
export interface SessionData {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  isLoggedIn: boolean;
}

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET is not set");
}

export const sessionOptions = {
  cookieName: OAUTH_CONFIG.SESSION_COOKIE_NAME,
  password: process.env.AUTH_SECRET,
  cookieOptions: {
    secure: true,
    httpOnly: true,
    maxAge: OAUTH_CONFIG.COOKIE_MAX_AGE,
    sameSite: "strict",
    path: "/",
  },
};

// PKCE utilities
export function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString("base64url");
}

export function generateCodeChallenge(codeVerifier: string): string {
  return crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");
}

export function generateState(): string {
  return crypto.randomBytes(16).toString("base64url");
}

// Session management using iron-session
export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

// Auth token management
export async function setAuthToken(
  token: string, 
  tokenType: string = "Bearer", 
  expiresIn: number = OAUTH_CONFIG.COOKIE_MAX_AGE
): Promise<void> {
  const session = await getSession();
  
  session.access_token = token;
  session.token_type = tokenType;
  session.expires_in = expiresIn;
  session.isLoggedIn = true;
  
  await session.save();
}

export async function getAuthToken(): Promise<string | null> {
  const session = await getSession();
  
  if (!session.isLoggedIn || !session.access_token) {
    return null;
  }
  
  return session.access_token;
}

export async function clearAuthToken(): Promise<void> {
  const session = await getSession();
  session.destroy();
}

// OAuth state management
export async function setOAuthState(state: string, codeVerifier: string): Promise<void> {
  const cookieStore = await cookies();
  
  cookieStore.set(OAUTH_CONFIG.STATE_COOKIE_NAME, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60, // 10 minutes
    path: "/",
  });
  
  cookieStore.set(OAUTH_CONFIG.CODE_VERIFIER_COOKIE_NAME, codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60, // 10 minutes
    path: "/",
  });
}

export async function getOAuthState(): Promise<{ state: string | null; codeVerifier: string | null }> {
  const cookieStore = await cookies();
  
  return {
    state: cookieStore.get(OAUTH_CONFIG.STATE_COOKIE_NAME)?.value || null,
    codeVerifier: cookieStore.get(OAUTH_CONFIG.CODE_VERIFIER_COOKIE_NAME)?.value || null,
  };
}

export async function clearOAuthState(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(OAUTH_CONFIG.STATE_COOKIE_NAME);
  cookieStore.delete(OAUTH_CONFIG.CODE_VERIFIER_COOKIE_NAME);
}

// OAuth URL builders
export function buildAuthorizeUrl(redirectUri: string): string {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateState();
  
  // Store state and code verifier in cookies (this will be handled by the login route)
  const params = new URLSearchParams({
    response_type: "code",
    redirect_uri: redirectUri,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });
  
  return `${OAUTH_CONFIG.AUTHORIZE_URL}?${params.toString()}`;
}

// Token exchange
export async function exchangeCodeForToken(
  code: string,
  redirectUri: string,
  codeVerifier: string
): Promise<{ access_token: string; token_type: string; expires_in: number }> {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });
  
  const response = await fetch(`${process.env.API_BASE_URL}${OAUTH_CONFIG.TOKEN_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "unknown_error" }));
    throw new Error(`Token exchange failed: ${error.error || "Unknown error"}`);
  }
  
  return response.json();
}

// Token revocation
export async function revokeToken(token: string): Promise<void> {
  const params = new URLSearchParams({
    token,
    token_type_hint: "access_token",
  });
  
  const response = await fetch(`${process.env.API_BASE_URL}${OAUTH_CONFIG.REVOKE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  
  // According to RFC 7009, revocation endpoint should return 200 even for invalid tokens
  if (!response.ok && response.status !== 200) {
    console.error("Token revocation failed:", response.status, response.statusText);
  }
}

// Auth validation
export async function validateAuth(): Promise<boolean> {
  const token = await getAuthToken();
  return token !== null;
}

// Redirect helpers
export async function requireAuth(): Promise<never> {
  redirect("/login");
}

export async function redirectIfAuthenticated(): Promise<void> {
  const isAuthenticated = await validateAuth();
  if (isAuthenticated) {
    redirect("/");
  }
}
