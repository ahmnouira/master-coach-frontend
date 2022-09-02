import { Component, OnInit } from '@angular/core';
import { SIDEBAR_ICON } from 'src/app/constants/icons';
import { CLIENT_SIDEBAR, COACH_SIDEBAR } from 'src/app/constants/sidebar';
import { AuthService } from 'src/app/core/auth.service';
import { UserRole } from 'src/app/models/role.enum';
import { User } from 'src/app/models/user-model';
import { RouteService } from 'src/app/services/route-service/route.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user-service/user-service.service';
import { SidebarItem } from 'src/app/types/sidebar-item.type';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isLoggedIn = false;
  role: string = '';
  path: string = '';
  form: any = {};

  sidebarItems: SidebarItem[];

  constructor(
    private route: RouteService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let token = this.tokenStorageService.getToken();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (token) {
      if (this.tokenExpired(token)) this.route.navigate(['/core/login']);
      this.authService.currentUser$.subscribe((user) => {
        const role: UserRole = user.role;
        if (role === UserRole.Coach) this.sidebarItems = COACH_SIDEBAR;
        else if (role === UserRole.Client) this.sidebarItems = CLIENT_SIDEBAR;
        this.role = role.toLowerCase();
        this.path = `/pages/${this.role}/paramter`;
      });
    } else {
      this.route.navigate(['/']);
    }
  }

  goToProfile() {
    this.route.navigateByUrl(this.path);
  }

  logout() {
    this.tokenStorageService.signOut();
    this.route.navigate(['/login']);
  }

  getUrl() {
    return this.route.router.url;
  }

  private tokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
