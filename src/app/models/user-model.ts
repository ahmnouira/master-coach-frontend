import { UserRole } from './role.enum';

export class User {
  password: string;
  userName: string;
  email: string;
  roles: UserRole[];
  competance: [];
  category: [];
  accreditation: [];
  status: string;
  nom: string;
  prenom: string;
  tel: string;
  photo: string;
  twilio_sid: string;
  subscriptionType: string;
  subscriptionEnd: string;
  subscriptionStart: string;
  stripeId: string;
}
