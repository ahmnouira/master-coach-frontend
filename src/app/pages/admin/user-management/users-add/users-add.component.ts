import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../../services/token-storage.service';
import { UserService } from '../../../../services/user-service.service';
import { Router } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss'],
})
export class UsersAddComponent implements OnInit {
  newUser = {
    username: '',
    password: '',
    competance: [],
    category: [],
    accreditation: [],
    email: '',
    status: 'En attente',
    role: '',
  };
  data: any[] = [];
  filteredData: any = [];
  userRoles: any = [];
  userCategory: any = [];
  userCompetences: any = [];
  userAccred: any = [];
  settings = {};
  public closeResult: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private adminService: AdminService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.settings = {
      text: 'Sélectionner...',
      searchPlaceholderText: 'Rechercher...',
      filterSelectAllText: 'Sélectionner tous les résultats filtrés',
      filterUnSelectAllText: 'Désélectionner tous les résultats filtrés',
      selectAllText: 'Sélectionner tout',
      unSelectAllText: 'Désélectionner tout',
      noDataLabel: 'Aucune donnée disponible',
      enableSearchFilter: true,
      labelKey: 'name',
      primaryKey: '_id',
      classes: 'form-control',
    };
    this.getCompetences();
    this.getAccredi();
    this.getCategories();
  }

  addUser() {
    this.newUser.password = this.newUser.username;
    this.userService.saveUser(this.newUser).subscribe(
      (res) => {
        this.router.navigateByUrl('/pages/admin/users/list');
      },
      (error) => {
        window.alert(error.message);
      }
    );
  }

  getCategories() {
    this.adminService.getAllCategorys().subscribe(
      (res) => {
        this.userCategory = res;
      },
      (error) => {
        window.alert(error.message);
      }
    );
  }

  getCompetences() {
    this.adminService.getAllCompetances().subscribe(
      (res) => {
        this.userCompetences = res;
      },
      (error) => {
        window.alert(error.message);
      }
    );
  }

  getAccredi() {
    this.adminService.getAllAccreditations().subscribe(
      (res) => {
        this.userAccred = res;
      },
      (error) => {
        window.alert(error.message);
      }
    );
  }

  userRoleChanged() {
    this.newUser.competance = [];
    this.newUser.category = [];
    this.newUser.accreditation = [];
  }
}
