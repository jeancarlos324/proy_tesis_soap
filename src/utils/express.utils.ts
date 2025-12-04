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

  public static parseSoapArgs<K>(args: Record<string, any>) {
    const parsed = Object.entries(args).map(([key, value]) => {
      if (value == null) return [key, undefined];

      const strVal = value.toString();

      // boolean
      if (strVal.toLowerCase() === 'true') return [key, true];
      if (strVal.toLowerCase() === 'false') return [key, false];

      // number
      if (!isNaN(Number(strVal))) return [key, Number(strVal)];

      // date
      const date = new Date(strVal);
      if (!isNaN(date.getTime())) return [key, date];

      // string (default)
      return [key, strVal];
    });

    return Object.fromEntries(parsed) as K;
  }

  public static pagination({ limit, offset, page }: IPagination) {
    if (offset !== undefined) return offset;
    if (!offset && page === undefined) return undefined;
    const newOffset = limit && page && limit * page;
    return newOffset;
  }
}

export default ExpressUtils;
