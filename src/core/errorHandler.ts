import { AppError } from './AppError';

export type SoapOperation<TArgs, TResult> = (args: TArgs) => Promise<TResult>;

export function withSoapErrorHandler<TArgs, TResult>(
  operation: SoapOperation<TArgs, TResult>,
): SoapOperation<TArgs, TResult> {
  return async (args: TArgs): Promise<TResult> => {
    try {
      return await operation(args);
    } catch (err) {
      if (err instanceof AppError) {
        throw {
          Fault: { faultcode: err.code, faultstring: err.message },
        };
      }
      throw {
        Fault: {
          faultcode: 'SERVER_ERROR',
          faultstring: 'Internal server error',
        },
      };
    }
  };
}
