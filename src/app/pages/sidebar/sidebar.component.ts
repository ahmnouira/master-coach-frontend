import { Component, OnInit } from '@angular/core';
import { COACH_SIDEBAR } from 'src/app/constants/sidebar';
import { RouteService } from 'src/app/services/route-service/route.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isLoggedIn = false;
  username?: string;
  role: string = '';
  path: string =  ""
  userData = {};
  form: any = {};

  coachSidebar = COACH_SIDEBAR;

  constructor(
    private route: RouteService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService
  ) {
    let token = this.tokenStorageService.getToken();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (token) {
      if (this.tokenExpired(token)) this.route.navigate(['/core/login']);
      const user = this.tokenStorageService.getUser();
      this.getUserFromDb(user._id);
    } else {
      this.route.navigate(['/']);
    }
  }

  ngOnInit(): void {}


  goToProfile() {
    this.route.navigateByUrl(
      this.path
    );
  }

  logout() {
    this.tokenStorageService.signOut();
    this.route.navigate(['/login']);
  }

  getUrl() {
    return this.route.router.url;
  }

  private getUserFromDb(id: any) {
    this.userService.getSingleUser(id).subscribe(
      (user) => {
        this.userData = user;
        this.role = user.role.toLowerCase();
        this.username = user.userName;
        this.path = '/pages/' + this.role + '/parametre'
      },
      (error) => {
        return {};
      }
    );
  }

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
