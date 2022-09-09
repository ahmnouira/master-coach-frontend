import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import moment from 'moment';
import { Notification } from 'src/app/models/notification/notification.model';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(
    private notificationService: NotificationService,
    private tokenStorageService: TokenStorageService,
    private routerService: RouteService
  ) {}

  ngOnInit(): void {}

  getNotifications() {
    this.notificationService
      .getNotifications(this.tokenStorageService.getUser()?._id)
      .subscribe((data) => {
        this.notifications = data.notifications;
        this.notifications = this.notifications.sort(
          (objA, objB) =>
            new Date(objB.date).getTime() - new Date(objA.date).getTime()
        );
        this.notifications.forEach((notification) => {
          notification.date = moment(notification.date).format(
            'DD/MM/yyyy HH:mm'
          );
        });
        this.notifications = data.notifications.filter(
          (elem: any) => elem.read == false
        );
      });
  }

  markOneAsRead(notification: any) {
    this.notificationService
      .markOneAsRead(notification._id)
      .subscribe((data) => {
        this.getNotifications();
        this.routerService.router.routeReuseStrategy.shouldReuseRoute = () =>
          false;
        this.routerService.router.onSameUrlNavigation = 'reload';
        if (notification.type == 'session')
          this.routerService.navigate(['/pages/rdv/detail'], {
            state: { id: notification },
          });
      });
  }

  markAllAsRead() {
    this.notificationService
      .markAllAsRead(this.tokenStorageService.getUser()?._id)
      .subscribe((data) => {
        this.getNotifications();
      });
  }
}
