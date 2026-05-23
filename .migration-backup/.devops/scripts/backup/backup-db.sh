#!/bin/bash

# Database backup script
# Usage: ./.devops/scripts/backup/backup-db.sh [environment]

set -e

ENVIRONMENT="${1:-production}"
BACKUP_DIR=".devops/backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/db-backup-$ENVIRONMENT-$TIMESTAMP.sql"

echo "💾 Starting database backup for $ENVIRONMENT..."

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup logic (customize based on your database)
# Example for PostgreSQL:
# pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME > "$BACKUP_FILE"

# Example for MongoDB:
# mongodump --uri="$MONGO_URI" --out="$BACKUP_DIR/mongo-$TIMESTAMP"

echo "✅ Backup created: $BACKUP_FILE"

# Compress backup
gzip "$BACKUP_FILE"
echo "✅ Backup compressed: $BACKUP_FILE.gz"

# Upload to cloud storage (optional)
# aws s3 cp "$BACKUP_FILE.gz" "s3://your-bucket/backups/"

# Clean old backups (keep last 7 days)
find "$BACKUP_DIR" -name "db-backup-$ENVIRONMENT-*.sql.gz" -mtime +7 -delete
echo "✅ Old backups cleaned"

echo "✅ Backup complete!"
