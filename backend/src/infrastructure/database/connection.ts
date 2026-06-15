import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";
import { logger } from "../logging/logger";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error(
    '[FATAL] DATABASE_URL environment variable is not set. ' +
    'Go to Vercel Dashboard → Settings → Environment Variables and add DATABASE_URL. ' +
    'The server will start but all database operations will fail.'
  );
}


// Configure connection pool for production scalability
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection cannot be established
  maxUses: 7500, // Close (and replace) a connection after it has been used 7500 times
});

// Handle pool errors
pool.on('error', (err) => {
  logger.error({ err }, 'Unexpected error on idle database client');
});

// Handle pool connection
pool.on('connect', () => {
  logger.debug('New database client connected to pool');
});

// Handle pool removal
pool.on('remove', () => {
  logger.debug('Database client removed from pool');
});

export const db = drizzle(pool, { schema });

// Graceful shutdown helper
export async function closeDatabase(): Promise<void> {
  await pool.end();
  logger.info('Database pool has ended');
}

export * from "./schema";