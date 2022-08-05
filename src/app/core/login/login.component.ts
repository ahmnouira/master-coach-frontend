import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Title} from "@angular/platform-browser";
import {Animations} from "../../shared/animations";
import {UserService} from "../../services/user-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: Animations
})
export class LoginComponent implements OnInit {

  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  @ViewChild('main') elem: ElementRef;
  constructor(public router: Router, private authService : AuthService, private tokenStorage: TokenStorageService, private titleService:Title, private userService : UserService) {
    this.titleService.setTitle("MasterCoach - Login")
  }

  ngOnInit(): void {
  }

  async login() {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe(
      authData => {
        this.tokenStorage.saveToken(authData.token);
        this.tokenStorage.saveTwilioToken(authData.twilio_token);
        this.tokenStorage.saveUser(authData);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.userService.getAllUser().subscribe(data=>{
          if(data){
            data = (data as any).filter(elem => elem.email == email);
            let user = data[0];
            //this.tokenStorage.saveUser(user);
            if(user.role.toLowerCase() === 'admin') {
              this.router.navigateByUrl('/pages/admin/users/list');
            }
            else {
              this.router.navigateByUrl('/pages/'+user.role.toLowerCase() + '/parametre');}
          } else {
            this.errorMessage = '';
            this.isLoginFailed = true;
          }
          this.errorMessage = '';
          this.isLoginFailed = true;
        },error => {
          this.errorMessage = error;
          this.isLoginFailed = true;
        })
      },
      err => {
        this.errorMessage = err;
        this.isLoginFailed = true;
      }
    );
  }

}
