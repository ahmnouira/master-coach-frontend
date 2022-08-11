import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { datatable_action } from '../../../../shared/datatable/datatable.model';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user-service.service';
import { AdminService } from '../../../../services/admin.service';
import { TokenStorageService } from '../../../../services/token-storage.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  searchValue: string = '';
  filter = new FormControl('');

  ACTION_COLUMNS: datatable_action[] = [];

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
