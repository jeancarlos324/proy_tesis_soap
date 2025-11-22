export interface ISoapFault {
  Fault: {
    faultcode: string;
    faultstring: string;
  };
}

export type SoapResult<T> = T | ISoapFault;
export const soapHandler = <Args, Result>(
  fn: (args: Args) => Promise<Result>,
): ((args: Args) => Promise<SoapResult<Result>>) => {
  return async (args: Args): Promise<SoapResult<Result>> => {
    try {
      return await fn(args);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');

      const fault: ISoapFault = {
        Fault: {
          faultcode: 'Server',
          faultstring: error.message,
        },
      };

      return fault;
    }
  };
};
