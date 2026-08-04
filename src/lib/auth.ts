import crypto from "crypto";

export const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
export const SESSION_TTL_SECONDS = SESSION_TTL_MS / 1000;

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET env var is not set");
  return secret;
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${expires}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const expires = Number(payload);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  return true;
}

function timingSafeStringEqual(candidate: string, actual: string): boolean {
  const a = Buffer.from(candidate);
  const b = Buffer.from(actual);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function checkCredentials(email: string, password: string): boolean {
  const actualEmail = process.env.ADMIN_EMAIL;
  const actualPassword = process.env.ADMIN_PASSWORD;
  if (!actualEmail) throw new Error("ADMIN_EMAIL env var is not set");
  if (!actualPassword) throw new Error("ADMIN_PASSWORD env var is not set");

  const emailOk = timingSafeStringEqual(email.trim().toLowerCase(), actualEmail.trim().toLowerCase());
  const passwordOk = timingSafeStringEqual(password, actualPassword);
  return emailOk && passwordOk;
}
