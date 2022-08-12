import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { Animations } from '../../shared/animations';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: Animations,
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  token = ''; 
  constructor(
    public router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private titleService: Title,
    private userService: UserService
  ) {
    this.titleService.setTitle('MasterCoach - Récupération de mot de passe');
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    
  }

  getToken() {
    this.route.queryParamMap.subscribe((params) => {

      console.log('params', params)
      //this.paramsObject = { ...params.keys, ...params };
       this.token =  params.get('token');
    });
  }
  

  async changePassword() {
    const { email, password } = this.form;
    this.authService
      .resetPassword({ email: email, token: password })
      .subscribe(
        (res) => {
          this.router.navigate(['/core/login']);
        },
        (error) => {
          this.errorMessage = error;
          console.error(this.errorMessage);
          this.isLoginFailed = true;
        }
      );
  }
}
