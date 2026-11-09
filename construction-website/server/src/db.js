// Database is optional. If DATABASE_URL is empty, enquiries are emailed but not stored.
let client = null;
if (process.env.DATABASE_URL) {
  const { PrismaClient } = await import('@prisma/client');
  client = new PrismaClient();
}
export const db = client;
