import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit() {}

  getUserRole() {
    return this.tokenStorageService.getUser()?.role;
  }
}
