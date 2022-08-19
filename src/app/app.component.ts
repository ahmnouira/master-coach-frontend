import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mastercoach-fe';
  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService) {
    const user = this.tokenStorageService.getUser()
    if(user) {
      authService.currentUser$.next(user)
    }

  }

  getUserRole() {
    return this.tokenStorageService.getUser()?.role;
  }
}
