import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Animations } from '../../shared/animations';
import { RouteService } from 'src/app/services/route-service/route.service';
import { UserRole } from 'src/app/models/role.enum';

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
    role: UserRole,
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
    this.form.role = this.authService.getUserRole;
  }

  createUser() {
    this.isLoading = true;
    console.log('form', this.form);

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
