import { TriageRepository } from '../repositories';
import {
  ITriageCreateForm,
  ITriageParams,
  ITriageUpdateForm,
} from '../types/triage';

class TriageService {
  public static getAll(args: ITriageParams) {
    const response = TriageRepository.getAll(args);
    return response;
  }

  public static getOne({
    patientId,
    ...args
  }: ITriageParams & { patientId: string }) {
    const response = TriageRepository.getAllByPatientId(patientId, args);
    return response;
  }

  public static create(data: ITriageCreateForm) {
    const response = TriageRepository.create(data);
    return response;
  }

  public static update({ id, ...data }: ITriageUpdateForm) {
    const response = TriageRepository.update(id, data);
    return response;
  }

  public static delete({ id }: { id: string }) {
    const response = TriageRepository.delete(id);
    return response;
  }
}
export default TriageService;
