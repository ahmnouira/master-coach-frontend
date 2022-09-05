import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { UserRole } from './models/role.enum';
import { User } from './models/user-model';
import { ConsoleService } from './services/console-service/console.service';
import { OrderService } from './services/order-service/order.service';
import { RouteService } from './services/route-service/route.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mastercoach-fe';
  user: User;
  role: UserRole;
  isLoading: boolean = true;

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private consoleService: ConsoleService,
    private routService: RouteService,
    private orderService: OrderService
  ) {
    this.isLoading = true;
    this.consoleService.disableConsoleInProduction();
    const user = this.tokenStorageService.getUser() as User;
    if (user) {
      this.user = user;
      this.role = user.role;
      authService.currentUser$.next(user);
    } else {
      // login, not logged in
    }

    this.isLoading = false;
  }
}
