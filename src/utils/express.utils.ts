import type { IPagination } from '../types';
class ExpressUtils {
  public static query<K>(query: string | string[]) {
    const parseQueriesArr = Object.entries(query).map(([key, value]) => [
      key,
      value
        ? value.toString().toLowerCase() === 'true'
          ? true
          : value.toString().toLowerCase() === 'false'
            ? false
            : !isNaN(+value)
              ? +value
              : typeof value === 'string' && !isNaN(new Date(value).getTime())
                ? new Date(value)
                : value
        : value?.length
          ? value
          : undefined,
    ]);
    return Object.fromEntries(parseQueriesArr) as K;
  }

  public static pagination({ limit, offset, page }: IPagination) {
    if (offset !== undefined) return offset;
    if (!offset && page === undefined) return undefined;
    const newOffset = limit && page && limit * page;
    return newOffset;
  }
}

export default ExpressUtils;
