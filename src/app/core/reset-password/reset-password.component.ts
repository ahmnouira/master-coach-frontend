import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Title} from "@angular/platform-browser";
import {Animations} from "../../shared/animations";
import {UserService} from "../../services/user-service.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: Animations
})
export class ResetPasswordComponent implements OnInit {

  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  constructor(public router: Router, private authService : AuthService, private tokenStorage: TokenStorageService, private titleService:Title, private userService: UserService) {
    this.titleService.setTitle("MasterCoach - Récupération de mot de passe")
  }

  ngOnInit(): void {
  }

  async changePassword() {
    const { email, password } = this.form;
    this.userService.resetPassword({email : email, new_password : password}).subscribe(res => {
      this.router.navigate(['/core/login'])
    }, error => {
      this.errorMessage = error;
      console.error(this.errorMessage);
      this.isLoginFailed = true;
    });
  }


}
