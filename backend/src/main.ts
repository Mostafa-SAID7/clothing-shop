import 'dotenv/config';
import app from "./presentation/app";
import { logger } from "./infrastructure/logging/logger";
import { closeDatabase } from "./infrastructure/database/connection";

const rawPort = process.env["PORT"] || "3001";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const server = app.listen(port, "0.0.0.0", (err?: Error) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  logger.info({ signal }, "Received shutdown signal, starting graceful shutdown");
  
  server.close(async (err) => {
    if (err) {
      logger.error({ err }, "Error during server shutdown");
      process.exit(1);
    }
    
    try {
      await closeDatabase();
      logger.info("Graceful shutdown completed");
      process.exit(0);
    } catch (error) {
      logger.error({ error }, "Error during database shutdown");
      process.exit(1);
    }
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));