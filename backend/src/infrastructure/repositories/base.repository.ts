import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PgTable } from 'drizzle-orm/pg-core';
import { NotFoundError } from '../../domain/errors';
import { DEFAULT_LIMIT, MAX_LIMIT } from '../../shared/config';

export abstract class BaseRepository<T extends Record<string, any>> {
  constructor(
    protected db: NodePgDatabase<any>,
    protected table: PgTable
  ) {}

  async findById(id: string): Promise<T | null> {
    const result = await this.db.select().from(this.table).where(eq(this.table.id, id)).limit(1);
    return result[0] ? this.mapFromDb(result[0]) : null;
  }

  async findByIdOrThrow(id: string, resourceName: string): Promise<T> {
    const result = await this.findById(id);
    if (!result) {
      throw new NotFoundError(resourceName, id);
    }
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db.delete(this.table).where(eq(this.table.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async findAll(limit = DEFAULT_LIMIT, offset = 0): Promise<T[]> {
    const safeLimit = Math.min(limit, MAX_LIMIT);
    const result = await this.db.select().from(this.table).limit(safeLimit).offset(offset);
    return result.map(item => this.mapFromDb(item));
  }

  async count(): Promise<number> {
    const result = await this.db.select({ count: this.db.count() }).from(this.table);
    return result[0]?.count ?? 0;
  }

  // Abstract method to be implemented by concrete repositories
  protected abstract mapFromDb(dbRecord: any): T;
}