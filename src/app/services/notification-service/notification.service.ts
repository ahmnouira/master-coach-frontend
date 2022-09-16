import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends BaseService {
  getNotifications(userId: any) {
    return this.get('/notifications/' + userId);
  }

  markOneAsRead(notificationId: any) {
    return this.put('/mark_as_read/' + notificationId, {});
  }

  markAllAsRead(userId: any) {
    return this.put('/mark_all_as_read/' + userId, {});
  }
}
