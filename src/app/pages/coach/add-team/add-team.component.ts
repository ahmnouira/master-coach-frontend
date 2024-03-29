import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoachService } from 'src/app/services/coach-service/coach.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {
  teamName = '';
  teamDesc = '';
  data: any[] = [];
  filteredData: any = [];
  userRoles: any = [];
  public closeResult: string;

  constructor(
    private router: Router,
    private coachService: CoachService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {}

  addTeam() {
    this.coachService
      .CreateTeam({
        name: this.teamName,
        description: this.teamDesc,
        coach_id: this.tokenService.getUser()._id,
        users: [],
      })
      .subscribe(
        (addData) => {
          this.router.navigateByUrl('/pages/coach/coach-client/team/list');
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
