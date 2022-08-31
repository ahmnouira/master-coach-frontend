import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DatableTableAction } from '../../../shared/data-table/action.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user-service/user-service.service';
import { CoachService } from 'src/app/services/coach-service/coach.service';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.scss'],
})
export class ListTeamsComponent implements OnInit {
  searchValue: string = '';
  filter = new FormControl('');

  ACTION_COLUMNS: DatableTableAction[] = [];

  DISPLAYED_COLUMNS: any[] = [];
  data: any[] = [];
  filteredData: any = [];
  selectedProfiles: any = [];
  loadingAnimation: boolean = true;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private coachService: CoachService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ACTION_COLUMNS.push({
      value: '',
      children: [
        {
          type: 'view',
          iconClass: 'view',
        },
      ],
    });
    this.ACTION_COLUMNS.push({
      value: '',
      children: [
        {
          type: 'delete',
          iconClass: 'delete',
        },
      ],
    });

    this.DISPLAYED_COLUMNS = [
      {
        data: 'name',
        value: "Nom de l'équipe",
        type: 'text',
        search: true,
        sort: true,
      },
      {
        data: 'description',
        value: "Description de l'équipe",
        type: 'text',
        search: true,
        sort: true,
      },
    ];
    this.getTeams();
  }

  getTeams() {
    this.coachService
      .GetTeams(this.tokenStorageService.getUser()._id)
      .subscribe((response) => {
        this.data = (response as any).teams;
        this.filteredData = response.teams;
        this.loadingAnimation = false;
      });
  }

  onActionClicked(element: any) {
    console.log(element);
    if (element.action == 'view') {
      this.router.navigateByUrl('/pages/coach/coach-client/team/view', {
        state: { id: element.item },
      });
    } else if (element.action == 'delete') {
      this.deleteTeam(element.item);
      window.location.reload();
    }
  }

  datatableChange(ev: any) {
    this.selectedProfiles = ev.filter((el: any) => el.selected);
    console.log(ev);
  }

  deleteTeam(team) {
    this.coachService.DeleteTeam(team).subscribe((response) => {
      console.log(response);
    });
  }
}
