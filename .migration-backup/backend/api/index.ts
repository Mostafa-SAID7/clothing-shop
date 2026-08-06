import 'dotenv/config';
import type { Request, Response, NextFunction } from 'express';

// Wrap import so cold-start crashes surface as readable JSON errors
let app: any;
try {
  app = require('../src/presentation/app').default;
} catch (err: any) {
  // If the app fails to initialize, return the error as JSON
  app = (_req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({
      error: 'Server failed to initialize',
      message: err?.message || 'Unknown startup error',
      hint: 'Check that all environment variables are set in Vercel dashboard: DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET, STRIPE_SECRET_KEY'
    });
  };
}

// This is the Vercel serverless function entry point.
// Vercel handles the HTTP server — we just export the Express app.
export default app;
