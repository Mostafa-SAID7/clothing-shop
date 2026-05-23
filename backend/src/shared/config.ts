import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DATABASE_URL = process.env.DATABASE_URL || '';
