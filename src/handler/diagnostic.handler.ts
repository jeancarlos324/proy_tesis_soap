import { soapErrorHandler } from '../core/soapErrorHandler';
import { DiagnosticService } from '../services';
import {
  IDiagnosticForm,
  IDiagnosticParams,
  IDiagnosticUpdate,
} from '../types/diagnostic';

class DiagnosticHandler {
  private static handler = soapErrorHandler;

  public static getAll = this.handler<IDiagnosticParams, unknown>(
    async (args) => DiagnosticService.getAll(args),
  );

  public static getOne = this.handler<{ id: string }, unknown>(async ({ id }) =>
    DiagnosticService.getOne({ id }),
  );

  public static create = this.handler<IDiagnosticForm, unknown>(async (args) =>
    DiagnosticService.create(args),
  );

  public static update = this.handler<IDiagnosticUpdate, unknown>(
    async (args) => DiagnosticService.update(args),
  );

  public static delete = this.handler<{ id: string }, unknown>(async ({ id }) =>
    DiagnosticService.delete({ id }),
  );
}
export default DiagnosticHandler;
