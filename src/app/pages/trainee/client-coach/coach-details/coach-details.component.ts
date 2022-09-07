import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { User } from 'src/app/models/user-model';
import { RouteService } from 'src/app/services/route-service/route.service';
import { UserService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-coach-details',
  templateUrl: './coach-details.component.html',
  styleUrls: ['./coach-details.component.scss'],
})
export class CoachDetailsComponent extends PageHelper<User> implements OnInit {

  id: string 

  constructor(private route: RouteService, private activatedRoute: ActivatedRoute, private userService: UserService) {
    super()
  }

  ngOnInit(): void {
    this.getId()
    this.getCoach()
  }  

  getId() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getCoach() {
    this.getData(this.userService.getUser(this.id), {
      debug: true
    });
  }
}


