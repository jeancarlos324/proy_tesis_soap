import { PatientRepository } from '../repositories';
import {
  IPatientCreateForm,
  IPatientParams,
  IPatientUpdateForm,
} from '../types/patient';

class PatientService {
  static async getAll(args: IPatientParams) {
    const response = await PatientRepository.getAll(args);
    return response;
  }

  static async getOne({ id }: { id: string }) {
    const response = await PatientRepository.getOne(id);
    return response;
  }

  static async create(data: IPatientCreateForm) {
    const response = await PatientRepository.create(data);
    return response;
  }

  static async update({ id, ...data }: IPatientUpdateForm) {
    const response = await PatientRepository.update(id, data);
    return response;
  }

  static async delete({ id }: { id: string }) {
    const response = await PatientRepository.delete(id);
    return response;
  }
}

export default PatientService;
