import { Component, OnInit } from '@angular/core';
import { CLIENT_SIDEBAR, COACH_SIDEBAR } from 'src/app/constants/sidebar';
import { AuthService } from 'src/app/core/auth.service';
import { UserRole } from 'src/app/models/role.enum';
import { RouteService } from 'src/app/services/route-service/route.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { SidebarItem } from 'src/app/types/sidebar-item.type';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isLoggedIn = false;
  role: string;
  form: any = {};
  isLoading: boolean = true;

  sidebarItems: SidebarItem[] = [];

  constructor(
    private route: RouteService,
    private tokenStorageService: TokenStorageService
  ) {
    this.isLoading = true;
    let token = this.tokenStorageService.getToken();
    const role = this.getRole();

    setTimeout(() => {
      if (token) {
        const expired = this.tokenExpired(token);
        if (expired) {
          this.route.navigate(['/core/login']);
        }
        if (role) {
          if (role === UserRole.Coach) this.sidebarItems = COACH_SIDEBAR;
          else if (role === UserRole.Client) this.sidebarItems = CLIENT_SIDEBAR;
          this.role = role.toLowerCase();
          this.isLoading = false;
        }
      } else {
        this.isLoading = true;
        this.route.navigate(['/']);
      }
    }, 100);
  }

  ngOnInit(): void {}

  logout() {
    this.tokenStorageService.signOut();
    this.route.navigate(['/login']);
  }

  getUrl() {
    return this.route.router.url;
  }

  getPath() {
    return `/pages/${this.role}/parametre`;
  }

  goToProfile() {
    this.route.navigateByUrl(this.getPath());
  }

  private getRole() {
    return this.tokenStorageService.getUser()?.role as UserRole;
  }

  private tokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
