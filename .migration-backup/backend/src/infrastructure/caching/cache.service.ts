import NodeCache from 'node-cache';

export class CacheService {
  private cache: NodeCache;
  constructor(ttlSeconds: number = 60) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2 });
  }
  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }
  set<T>(key: string, value: T, ttlSeconds?: number): void {
    if (ttlSeconds) {
      this.cache.set<T>(key, value, ttlSeconds);
    } else {
      this.cache.set<T>(key, value);
    }
  }
  del(key: string): void {
    this.cache.del(key);
  }
  flushAll(): void {
    this.cache.flushAll();
  }
}
