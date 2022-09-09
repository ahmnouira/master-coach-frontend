import { Component, OnInit } from '@angular/core';
import { UserRole } from '../models/role.enum';
import { OrderService } from '../services/order-service/order.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  role: UserRole;

  constructor(
    private tokenStorageService: TokenStorageService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.getUserRole();
  }

  getUserRole() {
    this.role = this.tokenStorageService.getUser()?.role;
  }
}
