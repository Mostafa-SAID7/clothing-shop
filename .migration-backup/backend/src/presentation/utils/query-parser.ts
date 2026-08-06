export class QueryParser {
  static parseNumber(value: any, defaultValue?: number): number | undefined {
    if (value === undefined || value === null || value === '') {
      return defaultValue;
    }
    const parsed = Number(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  static parseString(value: any, defaultValue?: string): string | undefined {
    if (value === undefined || value === null || value === '') {
      return defaultValue;
    }
    return String(value);
  }

  static parseBoolean(value: any, defaultValue?: boolean): boolean | undefined {
    if (value === undefined || value === null || value === '') {
      return defaultValue;
    }
    if (typeof value === 'boolean') return value;
    const str = String(value).toLowerCase();
    if (str === 'true' || str === '1') return true;
    if (str === 'false' || str === '0') return false;
    return defaultValue;
  }

  static parseArray(value: any): string[] | undefined {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }
    if (Array.isArray(value)) {
      return value.map(String);
    }
    return String(value).split(',').map(s => s.trim()).filter(Boolean);
  }

  static parsePagination(query: any): { page: number; limit: number; offset: number } {
    const page = QueryParser.parseNumber(query.page, 1) || 1;
    const limit = QueryParser.parseNumber(query.limit, 20) || 20;
    const offset = (page - 1) * limit;

    return {
      page: Math.max(1, page),
      limit: Math.min(100, Math.max(1, limit)), // Max 100 items per page
      offset: Math.max(0, offset),
    };
  }
}