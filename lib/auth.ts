import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_PASSWORD || 'default_secret_key_change_me'
);

export async function createSession(): Promise<string> {
  // Create a JWT that expires in 2 hours
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET_KEY);
    
  return token;
}

export async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false;
  
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload.role === 'admin';
  } catch (error) {
    return false;
  }
}

export async function cleanupSessions() {
    // No-op for stateless auth
}