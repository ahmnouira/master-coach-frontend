export interface IClient {
  prenom: string;
  nom: string;
  email: string;
  tel: string;
  notes: string;
  equip: string;
  photo?: string | File;
}
