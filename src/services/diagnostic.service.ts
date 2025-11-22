import { DiagnosticRepository } from '../repositories';
import {
  IDiagnosticForm,
  IDiagnosticParams,
  IDiagnosticUpdate,
} from '../types/diagnostic';

class DiagnosticService {
  public static async getAll(args: IDiagnosticParams) {
    const response = await DiagnosticRepository.getAll(args);
    return response;
  }

  public static async getOne({ id }: { id: string }) {
    const response = await DiagnosticRepository.getOne(id);
    return response;
  }

  public static async create(data: IDiagnosticForm) {
    const response = await DiagnosticRepository.create(data);
    return response;
  }

  public static async update({ id, ...data }: IDiagnosticUpdate) {
    const response = await DiagnosticRepository.update(id, data);
    return response;
  }

  public static async delete({ id }: { id: string }) {
    const response = await DiagnosticRepository.delete(id);
    return response;
  }
}
export default DiagnosticService;
