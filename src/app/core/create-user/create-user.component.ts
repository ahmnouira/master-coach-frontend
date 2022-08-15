import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Animations } from '../../shared/animations';
import { RouteService } from 'src/app/services/route-service/route.service';

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
    confirmPassword: null,
  };
  isLoading = false;
  isLoginFailed = false; // when action is failed
  errorMessage = '';
  accountType = 'Coach';
  
  constructor(
    private routeService: RouteService,
    private authService: AuthService
  ) {
    this.routeService.setTitle('MasterCoach - Creation de compte');
  }

  ngOnInit(): void {
    this.routeService.activatedRoute.params.subscribe((params) => {
      this.accountType = params['type'] == 'coach' ? 'Coach' : 'Client';
    });
  }

  // TODO: Remove this?!
  /*
  login() {
    const { email, password } = this.form;
    if (email.toString().includes('admin'))
      this.router.navigate(['/pages/admin/users/list']);
    else if (email.toString().includes('coach'))
      this.router.navigate(['/pages/coach/parametre']);
    else if (email.toString().includes('client'))
      this.router.navigate(['/pages/coach/parametre']);
  }
  */

  createUser() {
    this.form.role = this.accountType;
    this.isLoading = true;
    this.authService.register(this.form).subscribe(
      (res) => {
        console.log('createUser:', res);
        this.isLoading = false;
        this.routeService.navigate(['/']);
      },
      (error) => {
        console.error(this.errorMessage);
        this.isLoading = false;
        this.errorMessage = error;
        this.isLoginFailed = true;
      }
    );
  }
}
