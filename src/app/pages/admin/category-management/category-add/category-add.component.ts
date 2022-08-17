import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
})
export class CategoryAddComponent implements OnInit {
  newUser = {
    name: '',
  };
  data: any[] = [];
  filteredData: any = [];
  userRoles: any = [];
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
      labelKey: 'roleName',
      primaryKey: 'id',
      classes: 'form-control',
    };
  }

  addUser() {
    this.adminService.createCategory(this.newUser).subscribe(
      (res) => {
        this.router.navigateByUrl('/pages/admin/categories/list');
      },
      (error) => {
        console.error(error.message);
      }
    );
  }
}
