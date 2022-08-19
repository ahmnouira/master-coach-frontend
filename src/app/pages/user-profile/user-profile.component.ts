import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  form: any = {};
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    let userEmail = history.state?.id ? history.state?.id : {};
    this.getUserByEmail(userEmail);
  }

  getUserByEmail(email) {
    this.userService.getSingleUserByEmail(email).subscribe(
      (data) => {
        if (data.length > 0) this.form = { ...data[0] };
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
