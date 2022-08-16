import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route-service/route.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-base',
  templateUrl: './auth-base.component.html',
  styleUrls: ['./auth-base.component.scss'],
})
export class AuthBaseComponent {
  constructor(
    protected authService: AuthService,
    protected routeService: RouteService
  ) {}
}
