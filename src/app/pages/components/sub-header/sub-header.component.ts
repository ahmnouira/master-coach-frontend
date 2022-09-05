import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TokenStorageService } from 'src/app/services/token-storage.service';
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
    private authService: AuthService
  ) {
    moment.locale('fr');
  }

  ngOnInit(): void {
    this.getUser();
    moment.locale('fr');
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

  private getUser() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }
}
