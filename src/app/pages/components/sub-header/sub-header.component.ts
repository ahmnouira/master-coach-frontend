import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { FileHelper } from 'src/app/helpers/FileHelper';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/models/user-model';
import { RouteService } from 'src/app/services/route-service/route.service';
@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
})
export class SubHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string = 'BACK';

  todayDate = new Date();

  userNotifications: any = {};
  unreadUserNotifications: any = {};
  user: User;

  constructor(
    private tokenStorageService: TokenStorageService,
    private routerService: RouteService,
    private notifactionService: NotificationService,
    private authService: AuthService
  ) {
    moment.locale('fr');
  }

  ngOnInit(): void {
    this.getUser();
    moment.locale('fr');
    this.getNotifications();
  }

  getUserPicture() {
    if (this.user.photo) {
      return FileHelper.getUrl(this.user.photo);
    } else return '/assets/img/common/utilisateur.png';
  }

  getUserRole() {
    return this.tokenStorageService.getUser()?.role;
  }

  back(): void {
    this.routerService.back();
  }

  getNotifications() {
    this.notifactionService
      .getNotifications(this.tokenStorageService.getUser()?._id)
      .subscribe((data) => {
        this.userNotifications = data.notifications;
        this.userNotifications = this.userNotifications.sort(
          (objA, objB) =>
            new Date(objB.date).getTime() - new Date(objA.date).getTime()
        );
        this.userNotifications.forEach((notif) => {
          notif.date = moment(notif.date).format('DD/MM/yyyy HH:mm');
        });
        this.unreadUserNotifications = data.notifications.filter(
          (elem) => elem.read == false
        );
      });
  }

  markOneAsRead(notif) {
    this.notifactionService.markOneAsRead(notif._id).subscribe((data) => {
      this.getNotifications();
      this.routerService.router.routeReuseStrategy.shouldReuseRoute = () =>
        false;
      this.routerService.router.onSameUrlNavigation = 'reload';
      if (notif.type == 'session')
        this.routerService.navigate(['/pages/rdv/detail'], {
          state: { id: notif },
        });
    });
  }

  markAllAsRead() {
    this.notifactionService
      .markAllAsRead(this.tokenStorageService.getUser()?._id)
      .subscribe((data) => {
        this.getNotifications();
      });
  }

  private getUser() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }
}
