export interface IUser {
  photo?: File | string;
  lastName: string;
  firstName: string;
  email: string;
  tel: string;
  bio: string;
  cinF: File | string;
  cinB: File | string;
  kbis: File | string;
  urssaf?: string;
  categories?: string[];
  certifications?: string[];
  skills?: string[];
}
