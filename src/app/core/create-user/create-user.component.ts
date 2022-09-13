import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Animations } from '../../shared/animations';
import { RouteService } from 'src/app/services/route-service/route.service';
import { UserRole } from 'src/app/models/role.enum';
import { FormSimpleHelper } from 'src/app/helpers/FormSimpleHelper';
import { ActivatedRoute, RouterModule } from '@angular/router';

type Form = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
};

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  animations: Animations,
})
export class CreateUserComponent extends FormSimpleHelper implements OnInit {
  form: Form = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  title: string;
 
  params: any;

  constructor(
    private routeService: RouteService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    super();
  }
  ngOnInit(): void {
    this.getRole()
    this.title = `Créer votre compte ${this.form.role}!`;
    this.routeService.setTitle(
      `MasterCoach - Creation de compte ${this.form.role.toLowerCase()}`
    );
  }

  getRole() {
    this.activatedRoute.params.subscribe((params) => {
      const role = params['type'] as string
      this.form.role = (role.charAt(0).toUpperCase() + role.slice(1)
      ) as UserRole
    });
  }

  submit() {
    const { confirmPassword, password, username, email, role } = this.form;
    if (password !== confirmPassword) {
      this.onError('');
      return;
    }

    this.submitData(
      this.authService.register(this.form),
      {
        password,
        email,
        role,
        confirmPassword,
        username,
      },
      {
        debug: true,
      }
    );
  }
}
