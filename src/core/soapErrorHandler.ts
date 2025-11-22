import { AppError } from './AppError';

export function soapErrorHandler<TRequest, TResponse>(
  fn: (args: TRequest) => Promise<TResponse>,
) {
  return async (args: TRequest): Promise<TResponse | { Fault: unknown }> => {
    try {
      return await fn(args);
    } catch (error) {
      if (error instanceof AppError) {
        const { code, message, statusCode } = error;
        return {
          Fault: { faultcode: code, faultstring: message, status: statusCode },
        };
      }
      return {
        Fault: {
          faultcode: 'SERVER_ERROR',
          faultstring: 'Internal Server Error',
        },
      };
    }
  };
}
