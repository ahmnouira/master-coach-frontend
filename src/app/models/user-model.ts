import { IUser } from '../interfaces/user-interface';
import { Entity } from './entity/entity.model';
import { UserRole } from './role.enum';

export class User extends Entity implements IUser {
  username?: string;
  nom: string;
  email: string;
  tel: string;
  photo?: string | File;
  prenom: string;
  bio: string;
  cinF: string | File;
  cinB: string | File;
  kbis: string | File;
  rib: string | File;
  urssaf?: string;
  category?: any[];
  accreditation?: any[];
  competance?: any[];
  role: UserRole;
  // added fields
  readonly password: string;
  readonly isBlocked: boolean;
  readonly isEmailVerified: boolean;
  readonly stripeId: string;
  readonly twilio_sid: string;
  subscriptionType: string;
  subscriptionEnd: string;
  subscriptionStart: string;
  subscriptionPeriod: 'yearly' | 'monthly';
}
