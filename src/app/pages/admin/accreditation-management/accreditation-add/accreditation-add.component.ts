import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../../services/user-service.service";
import {TokenStorageService} from "../../../../services/token-storage.service";
import {AdminService} from "../../../../services/admin.service";

@Component({
  selector: 'app-accreditation-add',
  templateUrl: './accreditation-add.component.html',
  styleUrls: ['./accreditation-add.component.scss']
})
export class AccreditationAddComponent implements OnInit {

  newUser = {
    name: "",
  }
  data: any[] = [];
  filteredData: any = [];
  userRoles: any = [];
  settings = {};
  public closeResult: string;

  constructor(private router: Router,
              private userService : UserService ,  private adminService : AdminService,
              private tokenService : TokenStorageService) { }

  ngOnInit(): void {
    this.settings = {
      text: "Sélectionner...",
      searchPlaceholderText: "Rechercher...",
      filterSelectAllText: "Sélectionner tous les résultats filtrés",
      filterUnSelectAllText: "Désélectionner tous les résultats filtrés",
      selectAllText: 'Sélectionner tout',
      unSelectAllText: 'Désélectionner tout',
      noDataLabel: 'Aucune donnée disponible',
      enableSearchFilter: true,
      labelKey: "roleName",
      primaryKey: "id",
      classes: "form-control"
    };
  }

  addUser() {
    this.adminService.createAccreditation(this.newUser).subscribe(res => {
      this.router.navigateByUrl('/pages/admin/accreditations/list')
    },error => {
      window.alert(error.message)
    });
  }

}
