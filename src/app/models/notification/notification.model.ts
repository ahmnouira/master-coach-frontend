import { INotification } from 'src/app/interfaces/notification.interface';
import { Entity } from '../entity/entity.model';
import { User } from '../user-model';

export class Notification extends Entity implements INotification {
  date: any;
  user: User;
  message: string;
  read: boolean;
}
