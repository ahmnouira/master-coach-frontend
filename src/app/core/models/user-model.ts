export class User {
  password: string;
  userName: string;
  email: string;
  roles: "Client" | "Admin" | "Coach";
  competance: [];
  category: [];
  accreditation: [];
  status: string;
  nom: string;
  prenom: string;
  tel: string;
  photo: string;
  twilio_sid:string;
}
