import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { Animations } from '../../shared/animations';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  animations: Animations,
})
export class CreateUserComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    urssaf: null,
    confirmPassword: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  accountType = 'Coach';
  constructor(
    public router: Router,
    private authService: AuthService,
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) {
    this.titleService.setTitle('MasterCoach - Creation de compte');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.accountType = params['type'] == 'coach' ? 'Coach' : 'Client';
    });
  }

  login() {
    const { email, password } = this.form;
    if (email.toString().includes('admin'))
      this.router.navigate(['/pages/admin/users/list']);
    else if (email.toString().includes('coach'))
      this.router.navigate(['/pages/coach/parametre']);
    else if (email.toString().includes('client'))
      this.router.navigate(['/pages/coach/parametre']);
  }

  createUser() {
    this.form.role = this.accountType;
    this.authService.register(this.form).subscribe(
      (res) => {
        console.log("createUser", res)
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error;
        console.error(this.errorMessage);
        this.isLoginFailed = true;
      }
    );
  }
}
