import { User } from '../models/user-model';

export interface INotification {
  user: User;
  message: string;
  date: Date;
  read: boolean;
}
