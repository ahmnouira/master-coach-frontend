import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route-service/route.service';
import { Animations } from 'src/app/shared/animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  animations: Animations,
})
export class ConfirmEmailComponent implements OnInit, AfterViewInit {
  isLoading = true;
  errorMessage = '';
  successMessage = false;
  token = '';
  constructor(
    private routeService: RouteService,
    private authService: AuthService
  ) {
    this.routeService.setTitle('MasterCoach - Confirm email');
  }

  ngOnInit(): void {
    this.token = this.routeService.getQueryParamToken;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.confirmEmail();
    }, 1000);
  }

  async confirmEmail() {
    this.authService.confirmEmail({ token: this.token }).subscribe(
      (res) => {
        console.log('res:', res, res.success, res.message);
        if (res.success && res.message) {
          this.successMessage = true;
          this.isLoading = false;
        }
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
        this.successMessage = false;
      }
    );
  }
}
