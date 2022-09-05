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
  role: UserRole;

  sidebarItems: SidebarItem[]

  constructor(
    private route: RouteService,
    private tokenStorageService: TokenStorageService, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.role = user.role
      this.getSidebarItems(user.role);
    })
    
  }

  getSidebarItems(role: UserRole) {
    switch (role) {
      case UserRole.Client:
        this.sidebarItems = CLIENT_SIDEBAR;
        break;
      case UserRole.Coach: 
        this.sidebarItems = COACH_SIDEBAR;
        break
      default:
        break;
    }
  }

  logout() {
    this.tokenStorageService.logout();
    window.location.reload() // required
  }

  getUrl() {
    return this.route.router.url;
  }

  getPath() {
    if(!this.role) return '#'
    return `/pages/${this.role.toLowerCase()}/settings`;
  }

  goToProfile() {
    this.route.navigateByUrl(this.getPath());
  }


  private tokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
