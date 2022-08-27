import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user-service.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { FileHelper } from 'src/app/helpers/FileHelper';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/models/user-model';
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
    private location: Location,
    private notifactionService: NotificationService,
    private authService: AuthService, 
    private router: Router
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
    this.location.back();
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
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      if (notif.type == 'session')
        this.router.navigate(['/pages/rdv/detail'], { state: { id: notif } });
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
    this.authService.currentUser$.subscribe(
      (user) => {
        this.user = user;
      },
    );
  }
}
