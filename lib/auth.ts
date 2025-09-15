import { cookies } from "next/headers";
import z from "zod";
import buildUri from "./build-uri";

export const OAUTH_CONFIG = {
  AUTHORIZE_URL: buildUri("/api/auth/v2/authorize/google"),
  TOKEN_URL: buildUri("/api/auth/v2/token"),
  REVOKE_URL: buildUri("/api/auth/v2/revoke"),
  CALLBACK_PATH: "/api/auth/callback",
  TOKEN_COOKIE_NAME: "__Host-auth_token",
  STATE_COOKIE_NAME: "__Host-oauth_state",
  CODE_VERIFIER_COOKIE_NAME: "__Host-code_verifier",
  COOKIE_MAX_AGE: 8 * 60 * 60, // 8 hours in seconds
} as const;

// PKCE utilities
export function base64url(input: Uint8Array | ArrayBuffer): string {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  const binaryString = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binaryString).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function generateCodeVerifier(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);

  return base64url(bytes.buffer);
}

export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier));

  return base64url(hash);
}

export function generateState(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  return base64url(bytes.buffer);
}

// Auth token management
export async function setAuthToken(
  token: string,
  expiresIn: number = OAUTH_CONFIG.COOKIE_MAX_AGE,
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(OAUTH_CONFIG.TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: expiresIn,
    path: "/",
  });
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();

  return cookieStore.get(OAUTH_CONFIG.TOKEN_COOKIE_NAME)?.value ?? null;
}

export async function clearAuthToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: OAUTH_CONFIG.TOKEN_COOKIE_NAME,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
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
  codeVerifier: string,
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
  codeVerifier: string,
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
export interface AuthStatus {
  loggedIn: boolean;

  role?: "admin" | "user";
  introspectResult?: z.infer<typeof introspectSchema>;
}

export const introspectSchema = z.union([
  z.object({
    active: z.literal(true),
    scope: z.string().transform((scope) => scope.split(" ")).describe("the scopes of the token"),
    sub: z.string().describe("the subject of the token"),
    exp: z.number().describe("the time the token expires"),
    iat: z.number().describe("the time the token was issued"),
    azp: z.string().describe("the machine that is authorized to use this token"),
  }),
  z.object({
    active: z.literal(false),
  }),
]);

export async function getAuthStatus(): Promise<AuthStatus> {
  const token = await getAuthToken();
  if (!token) {
    return {
      loggedIn: false,
      introspectResult: undefined,
    };
  }

  // get user info
  const response = await fetch(buildUri("/api/auth/v2/introspect"), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token,
      token_type_hint: "access_token",
    }),
  });

  if (!response.ok) {
    console.error("Error validating auth:", response.status, response.statusText);
    return {
      loggedIn: false,
      introspectResult: undefined,
    };
  }

  const data = await response.json();
  const parsedData = introspectSchema.safeParse(data);

  if (!parsedData.success) {
    console.error("Error validating auth:", parsedData.error);
    return {
      loggedIn: false,
      introspectResult: undefined,
    };
  }

  if (!parsedData.data.active) {
    return {
      loggedIn: false,
      introspectResult: parsedData.data,
    };
  }

  if (parsedData.data.scope.includes("*")) {
    return {
      loggedIn: true,
      role: "admin",
      introspectResult: parsedData.data,
    };
  }

  return { loggedIn: true, role: "user", introspectResult: parsedData.data };
}
