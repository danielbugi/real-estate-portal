const JWT_SECRET =
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this';

function base64UrlToBase64(value: string): string {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = (4 - (base64.length % 4)) % 4;
  return `${base64}${'='.repeat(padding)}`;
}

function decodeBase64UrlToUtf8(value: string): string {
  const base64 = base64UrlToBase64(value);

  if (typeof atob === 'function') {
    return decodeURIComponent(
      Array.from(atob(base64))
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join(''),
    );
  }

  return Buffer.from(base64, 'base64').toString('utf-8');
}

function toBase64Url(value: ArrayBuffer): string {
  const bytes = new Uint8Array(value);
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

export async function verifyTokenEdge(token: string): Promise<any | null> {
  try {
    const [header, body, signature] = token.split('.');

    if (!header || !body || !signature) {
      console.log('[verifyTokenEdge] Invalid token format');
      return null;
    }

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );

    const expectedSignature = toBase64Url(
      await crypto.subtle.sign(
        'HMAC',
        key,
        new TextEncoder().encode(`${header}.${body}`),
      ),
    );

    if (signature !== expectedSignature) {
      console.log('[verifyTokenEdge] Signature mismatch');
      return null;
    }

    const payload = JSON.parse(decodeBase64UrlToUtf8(body));

    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) {
      console.log('[verifyTokenEdge] Token expired or invalid exp');
      return null;
    }

    return payload;
  } catch (error) {
    console.log('[verifyTokenEdge] Error:', error);
    return null;
  }
}
