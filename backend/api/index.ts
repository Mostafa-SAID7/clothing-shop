import 'dotenv/config';
import app from '../src/presentation/app';

// This is the Vercel serverless function entry point.
// Vercel handles the HTTP server — we just export the Express app.
export default app;
