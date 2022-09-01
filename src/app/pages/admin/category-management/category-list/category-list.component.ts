import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatableTableAction } from '../../../../shared/datatable/action.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user-service/user-service.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  searchValue: string = '';
  filter = new FormControl('');

  ACTION_COLUMNS: DatableTableAction[] = [];

  DISPLAYED_COLUMNS: any[] = [];
  data: any[] = [];
  filteredData: any = [];
  selectedProfiles: any = [];
  loadingAnimation: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private adminService: AdminService,
    private tokenService: TokenStorageService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    if (true) {
      this.ACTION_COLUMNS.push({
        value: '',
        children: [
          {
            type: 'delete',
            iconClass: 'delete',
          },
        ],
      });
    }
    this.DISPLAYED_COLUMNS = [
      {
        data: 'name',
        value: 'Libellé de catégorie',
        type: 'text',
        search: true,
        sort: true,
      },
    ];
    this.getUserProfileList();
  }

  onActionClicked(element: any) {
    if (element.action == 'delete') {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer ?')) {
        this.deleteUserProfile(element.item.name);
        this.getUserProfileList();
      }
    } else if (element.action == 'edit') {
      this.router.navigateByUrl('/pages/admin/categories/edit', {
        state: { id: element.item },
      });
    }
  }

  getUserProfileList() {
    this.adminService.getAllCategorys().subscribe((response) => {
      this.data = response as any;
      this.filteredData = response;
      this.loadingAnimation = false;
    });
  }

  datatableChange(ev: any) {
    this.selectedProfiles = ev.filter((el: any) => el.selected);
  }

  deleteUserProfile(id) {
    this.adminService.deleteCategory(id).subscribe((res) => {
      window.location.reload();
    });
  }

  massDelete() {
    this.selectedProfiles.forEach((elem) => {
      this.deleteUserProfile(elem.id);
    });
    this.getUserProfileList();
  }
}
