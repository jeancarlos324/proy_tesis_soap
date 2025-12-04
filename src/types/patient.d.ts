import { IPagination } from './global';

export interface IPatientParams extends IPagination {
  nationalIdentity?: string;
  firstName?: string;
  lastName?: string;
}
export interface IPatientCreateForm {
  patient: {
    firstName: string;
    lastName: string;
    nationalIdentity: string;
    dateBirth: string;
    location?: string;
    gender: string;
    numberPhone?: string;
    department?: string;
    province?: string;
    district?: string;
    bloodType?: string;
    physicalHistory: string;
    image?: string;
    job?: string;
  };
}

export interface IPatientData {
  firstName: string;
  lastName: string;
  nationalIdentity: string;
  dateBirth: string;
  location?: string;
  gender: string;
  numberPhone?: string;
  department?: string;
  province?: string;
  district?: string;
  bloodType?: string;
  physicalHistory: string;
  image?: string;
  job?: string;
}

export interface IPatientUpdateForm extends IPatientCreateForm {
  id: string;
}
