const encoder = new TextEncoder();
let _hmacKeyPromise: Promise<CryptoKey> | null = null;

function getEnv(name: string, minLength: number): string {
  const value = process.env[name];
  if (!value || value.length < minLength) {
    throw new Error(
      `환경변수 ${name}이(가) 설정되지 않았거나 최소 길이(${minLength})를 충족하지 않습니다.`
    );
  }
  return value;
}

function getAdminPassword(): string {
  return getEnv("ADMIN_PASSWORD", 8);
}

function getAdminSecret(): string {
  return getEnv("ADMIN_SECRET", 16);
}

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Constant-time byte-XOR comparison. Uses encoded byte arrays so multi-byte
// UTF-8 chars don't bypass the length check via code-unit vs byte-length mismatch.
function safeCompare(a: string, b: string): boolean {
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  if (aBytes.length !== bBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) {
    diff |= aBytes[i] ^ bBytes[i];
  }
  return diff === 0;
}

export async function verifyPassword(password: string): Promise<boolean> {
  return safeCompare(password, getAdminPassword());
}

async function importHMACKey(): Promise<CryptoKey> {
  if (!_hmacKeyPromise) {
    _hmacKeyPromise = crypto.subtle.importKey(
      "raw",
      encoder.encode(getAdminSecret()),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
  }
  return _hmacKeyPromise;
}

export async function createToken(): Promise<string> {
  const timestamp = Date.now().toString();
  const key = await importHMACKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`admin:${timestamp}`)
  );
  return `${timestamp}.${bufToHex(signature)}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const [timestamp, sig] = token.split(".");
    if (!timestamp || !sig) return false;

    // 7일 만료
    const age = Date.now() - parseInt(timestamp);
    if (age > 7 * 24 * 60 * 60 * 1000) return false;

    const key = await importHMACKey();
    const expected = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(`admin:${timestamp}`)
    );
    return safeCompare(sig, bufToHex(expected));
  } catch (err) {
    console.warn(
      `[auth] verifyToken failed:`,
      err instanceof Error ? err.message : err
    );
    return false;
  }
}
