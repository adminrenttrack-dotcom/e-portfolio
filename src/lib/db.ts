import { neon } from "@neondatabase/serverless";

export function getSql() {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.NEON_DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add your Neon connection string in .env.local or Vercel Environment Variables."
    );
  }
  return neon(url);
}
