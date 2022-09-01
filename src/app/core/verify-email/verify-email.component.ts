import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route-service/route.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  isLoading = true;
  errorMessage = '';
  successMessage = '';
  isVerified = true;
  isLoginFailed = false;

  email: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.email = this.authService.getResendEmail;
  }

  resendVerification() {
    if (!this.email) {
      this.errorMessage = "Pas d'email";
      return;
    }

    try {
      this.authService
        .resendVerification({ email: this.email })
        .subscribe((res) => {
          this.isVerified = true;
          if (res.success && res.data) {
            this.successMessage = res.data;
            this.isVerified = true;
          }
        });
    } catch (error) {
      console.error('error', error);
      this.successMessage = '';
      this.errorMessage = String(error);
      this.isLoginFailed = true;
    }
  }
}
