import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import buildUri from "./build-uri";

// Constants for OAuth 2.0 PKCE flow
export const OAUTH_CONFIG = {
  AUTHORIZE_URL: buildUri("/api/auth/v2/authorize/google"),
  TOKEN_URL: buildUri("/api/auth/v2/token"),
  REVOKE_URL: buildUri("/api/auth/v2/revoke"),
  CALLBACK_PATH: "/api/auth/callback",
  SESSION_COOKIE_NAME: "__Host-auth_session",
  STATE_COOKIE_NAME: "__Host-oauth_state",
  CODE_VERIFIER_COOKIE_NAME: "__Host-code_verifier",
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
export function base64url(input: Uint8Array | ArrayBuffer): string {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  const binaryString = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binaryString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function generateCodeVerifier(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);

  return base64url(bytes.buffer);
}

export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier))

  return base64url(hash);
};

export function generateState(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  return base64url(bytes.buffer);
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
    secure: true,
    sameSite: "lax",
    maxAge: 10 * 60, // 10 minutes
    path: "/",
  });
  
  cookieStore.set(OAUTH_CONFIG.CODE_VERIFIER_COOKIE_NAME, codeVerifier, {
    httpOnly: true,
    secure: true,
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
  cookieStore.delete({
    name: OAUTH_CONFIG.STATE_COOKIE_NAME,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  cookieStore.delete({
    name: OAUTH_CONFIG.CODE_VERIFIER_COOKIE_NAME,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}

// OAuth URL builders
export async function buildAuthorizeUrl(
  redirectUri: string,
  state: string,
  codeVerifier: string
): Promise<string> {
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  
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
  
  const response = await fetch(OAUTH_CONFIG.TOKEN_URL, {
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
  
  const response = await fetch(OAUTH_CONFIG.REVOKE_URL, {
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
