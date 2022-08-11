import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import { Location } from '@angular/common'
import {NotificationService} from "../../../services/notification.service";
import * as moment from 'moment';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user-service.service";
@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {
  todayDate = new Date();
  @Input() title  : string;
  @Input() subTitle : string;
  userNotifications : any = {};
  unreadUserNotifications : any = {};
  userData : any = {};

  constructor(private tokenStorageService: TokenStorageService,private userService: UserService, private location: Location, private notifactionService : NotificationService, private router : Router) {
    moment.locale('fr');
  }

  ngOnInit(): void {
    moment.locale('fr');
    this.getNotifications();
    this.getUserFromDb(this.tokenStorageService.getUser()._id);
  }

  getUserPicture() {
    if(this.userData.photo) {
      return this.userData.photo;
    }
    else
    return '/assets/img/common/utilisateur.png';
  }

  getUserRole() {
    return this.tokenStorageService.getUser()?.role;
  }

  back(): void {
    this.location.back();
  }

  getNotifications() {
    this.notifactionService.getNotifications(this.tokenStorageService.getUser()?._id).subscribe(
        data => {
          this.userNotifications = data.notifications;
          this.userNotifications = this.userNotifications.sort(
            (objA, objB) => new Date(objB.date).getTime() - new Date( objA.date).getTime(),
          );
          this.userNotifications.forEach(notif => {
            notif.date = moment(notif.date).format('DD/MM/yyyy HH:mm')
          })
          this.unreadUserNotifications = data.notifications.filter(elem => elem.read == false);
        }
    )
  }


  markOneAsRead(notif) {
    this.notifactionService.markOneAsRead(notif._id).subscribe(
        data => {
          this.getNotifications();
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          if(notif.type == 'session')   this.router.navigate(['/pages/rdv/detail'], { state: { id: notif } });
        }
    )
  }


  markAllAsRead() {
    this.notifactionService.markAllAsRead(this.tokenStorageService.getUser()?._id).subscribe(
        data => {
          this.getNotifications();
        }
    )
  }

  private getUserFromDb(id: any){
    this.userService.getSingleUser(id).subscribe(
      user => {
        this.userData = user;
      },
      error => { return {};}
    )
  }

}