import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CLIENT_DOCS_FILTER_STATUS,
  CLIENT_DOCS_FILTER_THEMATIC,
} from 'src/app/constants/client/documents';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { UserService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.scss'],
})
export class CoachListComponent extends PageHelper implements OnInit {
  filters: any = {};

  search = '';
  filteredData: any;
  filterString: string;

  selectedCoachType: string[] = [];
  selectedContent: string[] = [];
  selectedCompetence: string[] = [];
  selectedAccreditation: string[] = [];

  categories: string[];
  skills: string[];
  certifications: string[];

  FILTER_TYPES = CLIENT_DOCS_FILTER_STATUS;
  FILTER_WITH = CLIENT_DOCS_FILTER_THEMATIC;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private routeService: RouteService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getSelectField('categories');
    this.getSelectField('skills');
    this.getSelectField('certifications');
    this.getCoaches();
  }

  getCoaches() {
    this.getData(this.userService.getUsers(), {
      debug: true,
    });
  }

  filterInputChanged(event: any) {}

  getSelectField(name: 'categories' | 'skills' | 'certifications') {
    let action: Observable<any>;
    switch (name) {
      case 'categories':
        action = this.adminService.getAllCategorys();
        break;
      case 'skills':
        action = this.adminService.getAllCompetances();
        break;
      case 'certifications':
        action = this.adminService.getAllAccreditations();
        break;
      default:
        break;
    }
    action.subscribe(
      (res) => {
        this[name] = res;
      },
      (error) => {
        this.onError(error);
      }
    );
  }

  resetFilters(event) {
    console.log('reset', event);
    this.filteredData = this.data;
    this.selectedCompetence = [];
    this.selectedAccreditation = [];
    this.selectedCoachType = [];
    this.selectedContent = [];
    this.filterString = '';
    this.filters = {};
  }
}
