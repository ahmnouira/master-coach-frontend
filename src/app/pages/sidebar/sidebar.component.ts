import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CLIENT_SIDEBAR, COACH_SIDEBAR } from 'src/app/constants/sidebar';
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
  @Input() role: UserRole;

  sidebarItems: SidebarItem[] = [];

  constructor(
    private route: RouteService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.getSidebarItems();
  }

  getSidebarItems() {

    switch (this.role) {
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
    this.route.navigate(['/login']);
  }

  getUrl() {
    return this.route.router.url;
  }

  getPath() {
    return `/pages/${this.role.toLowerCase()}/settings`;
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
