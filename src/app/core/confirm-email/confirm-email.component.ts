import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user-service.service';
import { Animations } from 'src/app/shared/animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  animations: Animations,
})
export class ConfirmEmailComponent implements OnInit, AfterViewInit {
  loading = true;
  errorMessage = '';
  successMessage = '';
  token = '';

  constructor(
    public router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.titleService.setTitle('MasterCoach - Confirm email');
  }

  ngOnInit(): void {
    this.getToken();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.confirmEmail();
    }, 3000);
  }

  getToken() {
    this.route.queryParamMap.subscribe((params) => {
      console.log('params', params.get('token'));
      //this.paramsObject = { ...params.keys, ...params };
      this.token = params.get('token');
    });
  }

  async confirmEmail() {
    this.authService.confirmEmail({ token: this.token }).subscribe(
      (res) => {
        console.log('res', res, res.success, res.data);
        if (res.success && res.data) this.successMessage = res.data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
}
