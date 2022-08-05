import { Component, OnInit } from '@angular/core';
import {datatable_action} from "../../../../shared/datatable/datatable.model";
import {FormControl} from "@angular/forms";
import {UserService} from "../../../../services/user-service.service";
import {TokenStorageService} from "../../../../services/token-storage.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  searchValue : string = '';
  filter = new FormControl('');


  ACTION_COLUMNS: datatable_action[] = [];

  DISPLAYED_COLUMNS : any[] = [];
  data: any[] = [];
  filteredData: any = [];
  selectedProfiles: any = [];
  loadingAnimation : boolean = true

  statusClass: any = {
    inactive : 'badge bg-danger',
    active : 'badge bg-success',
    ongoing : 'badge bg-info',
  };

  constructor(private router: Router, private userService : UserService,
               private tokenService : TokenStorageService, private titleService : Title) { }

  ngOnInit(): void {

    if(true) {
      this.ACTION_COLUMNS.push({
        value: '',
        childrens: [
          {
            type: 'edit',
            iconClass: 'edit',
          },
        ],
      });
      this.ACTION_COLUMNS.push({
        value: '',
        childrens: [
          {
            type: 'delete',
            iconClass: 'delete',
          },
        ],
      });
    }
    this.DISPLAYED_COLUMNS = [
      {
        data: 'username',
        value: 'Nom d\'utilisateur',
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
      },
      {
        data: 'role',
        value: 'Role',
        type: 'text',
        search: true,
        sort: true,
      },
      {
        data: 'status',
        value: 'Status',
        type: 'badge',
        search: true,
        sort: true,
      },
      {
        data: 'categories',
        value: 'Categories',
        type: 'text',
        search: true,
        sort: true,
      },
      {
        data: 'competances',
        value: 'Compétences',
        type: 'text',
        search: true,
        sort: true,
      },
      {
        data: 'accreditations',
        value: 'Accréditations',
        type: 'text',
        search: true,
        sort: true,
      }
    ];
    this.getUserProfileList();
  }

  onActionClicked(element: any) {
    if(element.action == 'delete') {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer ?')) {
        this.deleteUserProfile(element.item._id);
        this.getUserProfileList();
      }
    } else if (element.action == 'edit') {
      this.router.navigateByUrl('/pages/admin/users/edit', { state: { id: element.item } });
    }
  }

  getUserProfileList() {
    this.userService.getAllUser()
      .subscribe(response => {
        this.data = (response as any);
        this.filteredData = response;
        this.filteredData.forEach(elem => {
          let a = [];
          elem.competance?.forEach(el => {
            if(typeof el === 'object') {
              a.push(el.name);
            }
            else if(typeof el === 'string') {a.push(el)}
          })
          elem.competances = a.join(", ");
          a = [];
          elem.accreditation?.forEach(el => {
            if(typeof el === 'object') {
              a.push(el.name);
            }
            else if(typeof el === 'string') {a.push(el)}
          })
          elem.accreditations = a.join(", ");
          a = [];
          elem.category?.forEach(el => {
            if(typeof el === 'object') {
              a.push(el.name);
            }
            else if(typeof el === 'string') {a.push(el)}
          })
          elem.categories= a.join(", ");
          elem.status_class= elem.status == 'Actif' ? "badge bg-success badge-width" : elem.status == 'Inactif' ? 'badge bg-danger badge-width': 'badge bg-warning badge-width';
        });
        this.loadingAnimation = false;
      });
  }

  datatableChange(ev: any) {
    this.selectedProfiles = ev
      .filter((el: any) => el.selected);
  }


  deleteUserProfile(id) {
    this.userService.deleteUser(id).subscribe(res => {
      window.location.reload()
    })
  }
  massDelete() {
    this.selectedProfiles.forEach(elem => {
      this.deleteUserProfile(elem.id);
    });
    this.getUserProfileList();
  }

}
