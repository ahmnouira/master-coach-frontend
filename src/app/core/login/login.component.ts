import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { Animations } from '../../shared/animations';
import { UserService } from '../../services/user-service.service';
import { retry } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: Animations,
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  isVerified = true; 

  @ViewChild('main') elem: ElementRef;
  constructor(
    public router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private titleService: Title,
    private userService: UserService
  ) {
    this.titleService.setTitle('MasterCoach - Login');
  }

  ngOnInit(): void {}

  async login() {
    const { email, password } = this.form;

    if(!email || !password) return

    this.authService.login(email, password).subscribe(
      (authData) => {
        //isBlocked: false
        // isEmailVerified: false
    
        console.log('authData:', authData)


              /*
              if (user.role.toLowerCase() === 'admin') {
                this.router.navigateByUrl('/pages/admin/users/list');
              } else {
                this.router.navigateByUrl(
                  '/pages/' + user.role.toLowerCase() + '/parametre'
                );
              }*/
        this.tokenStorage.saveToken(authData.token);
        this.tokenStorage.saveTwilioToken(authData.twilio_token);
        this.tokenStorage.saveUser(authData);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.isVerified = true
    
      },
      (err) => {
        console.log("error", err)
        if(err == "Your email is not verified") {
          this.isVerified = false

        }
        this.errorMessage = err;
        this.isLoginFailed = true;
      }
    );
  }


  verifyEmail() {
    alert('Not implemented')
  }
}
