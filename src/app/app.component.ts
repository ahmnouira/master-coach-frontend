import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { UserRole } from './models/role.enum';
import { User } from './models/user-model';
import { ConsoleService } from './services/console-service/console.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mastercoach-fe';
  user: User;
  userRole: UserRole;

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private consoleService: ConsoleService
  ) {
    // this.consoleService.disableConsoleInProduction();
    const user = this.tokenStorageService.getUser() as User;
    if (user) {
      this.user = user;
      this.userRole = user.role;
      authService.currentUser$.next(user);
    }
  }
}
