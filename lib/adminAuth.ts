const encoder = new TextEncoder();

export const ADMIN_USER = "admin";
export const ADMIN_SESSION_COOKIE = "admin_session";

async function sha256Hex(input: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(input));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Derives a session token from the admin password so the cookie never stores the password itself. */
export function computeSessionToken(password: string) {
  return sha256Hex(`3mcars-admin-session:${password}`);
}
