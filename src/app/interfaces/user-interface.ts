export interface IUser {
  photo?: File | string;
  prenom: string;
  nom: string;
  email: string;
  tel: string;
  bio: string;
  cinF: File | string;
  cinB: File | string;
  kbis: File | string;
  rib: File | string;
  urssaf?: string;
  category?: any[];
  accreditation?: any[];
  competance?: any[];
}
