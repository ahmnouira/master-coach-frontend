import { IUser } from '../interfaces/user-interface';
import { Entity } from './entity/entity.model';
import { UserRole } from './role.enum';

export class User extends Entity implements IUser {
  lastName: string;
  firstName: string;
  email: string;
  tel: string;
  bio: string;
  cinF: string | File;
  cinB: string | File;
  kbis: string | File;
  photo?: string;
  urssaf?: string;
  categories?: string[];
  certifications?: string[];
  skills?: string[];
 
  // added fields 
  readonly password: string;
  readonly isBlocked: boolean
  readonly isEmailVerified: boolean
  readonly stripeId: string;
  readonly twilio_sid: string;
  subscriptionType: string;
  subscriptionEnd: string;
  subscriptionStart: string;
}
