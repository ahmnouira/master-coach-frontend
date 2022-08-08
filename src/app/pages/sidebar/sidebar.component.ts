import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";
import {UserService} from "../../services/user-service.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isLoggedIn = false;
  username?: string;
  role: string ='';
  userData = {};
  form: any = {};

  constructor(private router : Router, private tokenStorageService : TokenStorageService, private userService : UserService) {

    let token = this.tokenStorageService.getToken();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (token) {
      if(this.tokenExpired(token)) this.router.navigate(['/core/login']);
      const user = this.tokenStorageService.getUser();
      this.getUserFromDb(user._id)
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  getUserRole() {
    return this.tokenStorageService.getUser()?.role;
  }

  goToProfile() {
    this.router.navigateByUrl('/pages/' + this.getUserRole().toLowerCase()+'/parametre')
  }

  logout(){
      this.tokenStorageService.signOut();
      window.location.reload()
  }

  getUrl() {
    return this.router.url;
  }

  private getUserFromDb(id: any){
    this.userService.getSingleUser(id).subscribe(
      user => {
        this.userData = user;
        this.role = user.role;
        this.username = user.userName;
        },
      error => { return {};}
    )
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
