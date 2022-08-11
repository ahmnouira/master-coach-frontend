import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mastercoach-fe';
  constructor(private tokenStorageService: TokenStorageService) {}

  getUserRole() {
    return this.tokenStorageService.getUser()?.role;
  }
}
