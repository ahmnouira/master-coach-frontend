import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormControl} from "@angular/forms";
import {datatable_action} from "../../../shared/datatable/datatable.model";
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserService} from "../../../services/user-service.service";
import {CoachService} from "../../../services/coach.service";
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.scss']
})
export class ViewTeamComponent implements OnInit {

  modalRef: BsModalRef;
  searchValue : string = '';
  filter = new FormControl('');


  ACTION_COLUMNS: datatable_action[] = [];

  DISPLAYED_COLUMNS : any[] = [];
  data: any[] = [];
  filteredData: any = [];
  selectedProfiles: any = [];
  loadingAnimation : boolean = false;
  teamObject: any = {}

  constructor(private tokenStorageService : TokenStorageService, private userService : UserService, private coachService : CoachService, private router : Router, private modalService : BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {

    this.ACTION_COLUMNS.push({
      value: '',
      childrens: [
        {
          type: 'delete',
          iconClass: 'delete',
        },
      ],
    });

    this.DISPLAYED_COLUMNS = [
      {
        data: 'nom',
        value: 'Nom',
        type: 'text',
        search: true,
        sort: true,
      },
      {
        data: 'prenom',
        value: 'Prenom',
        type: 'text',
        search: true,
        sort: true,
      },
      {
        data: 'email',
        value: 'Email',
        type: 'text',
        search: true,
        sort: true,
      }
    ];
    this.teamObject = history.state?.id ? history.state?.id: {};
  }

  getTeams() {
    this.loadingAnimation = true;
    this.coachService.GetTeams(this.tokenStorageService.getUser()._id)
      .subscribe(response => {
        this.data = (response as any).teams;
        this.filteredData = response.teams;
        this.teamObject = this.data.filter(elem => elem._id = this.teamObject._id)[0];
        this.loadingAnimation = false;
      });
  }

  onActionClicked(element: any) {
    if (element.action == 'delete') {
      this.deleteUserFromTeam(element.item);
    }
  }

  datatableChange(ev: any) {
    this.selectedProfiles = ev
      .filter((el: any) => el.selected);
    console.log(ev);
  }

  deleteUserFromTeam(element){
    let data = {
      coach_id : this.tokenStorageService.getUser()._id,
      team_id : this.teamObject._id,
      user_id : element._id
    }
    let index = this.teamObject.users.findIndex(object => {
      return object._id === element._id;
    });
    console.log(index)
    this.teamObject.users.splice(index,1);
    this.coachService.DeleteTeamMember(data).subscribe(
      data =>{
        console.log(data);
      },
      error => {
        console.log(error);}
    )
  }


  massDelete() {
    this.selectedProfiles.forEach(elem => {
      this.deleteUserFromTeam(elem);
    });
    this.getTeams();
    this.modalRef.hide();
  }

}
