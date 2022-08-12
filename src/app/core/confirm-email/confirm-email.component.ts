import { Component, OnInit } from '@angular/core';
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
export class ConfirmEmailComponent implements OnInit {

  form: any = {
    code: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  successMessage  = ''
  token = ''; 

  constructor(
    public router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private titleService: Title,
    private userService: UserService
  ) {
    this.titleService.setTitle('MasterCoach - Confirm email');
  }

  ngOnInit(): void {
    this.getToken()
  }

  getToken() {
    this.route.queryParamMap.subscribe((params) => {
      console.log('params', params.get('token'))
      //this.paramsObject = { ...params.keys, ...params };
       this.token =  params.get('token');
    });
  }
  

  async confirmEmail() {
    const { code } = this.form;
    this.authService
      .confirmEmail({token: this.token})
      .subscribe(
        (res) => {
          console.log('res' ,res, res.success, res.data)
          if(res.success && res.data) this.successMessage = res.data
        },
        (error) => {
          this.errorMessage = error;
          console.error(this.errorMessage);
          this.isLoginFailed = true;
        }
      );
  }

}
