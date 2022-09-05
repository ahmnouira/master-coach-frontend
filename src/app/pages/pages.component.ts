import { Component, OnInit } from '@angular/core';
import { UserRole } from '../models/role.enum';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  
  role: UserRole
  
  constructor(private tokenStorageService: TokenStorageService) {

  }

  ngOnInit() {
    this.role
  }

  getUserRole() {
    this.role = this.tokenStorageService.getUser()?.role;
  }
}
