import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service.service';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-coach',
  templateUrl: './find-coach.component.html',
  styleUrls: ['./find-coach.component.scss'],
})
export class FindCoachComponent implements OnInit {
  data: any[] = [];
  filteredData: any = [];
  accreditations: any = [];
  competences: any = [];
  categories: any = [];
  filterString = '';
  selectedComp = 'Compétences';
  selectedContent = 'Type de contenu';
  selectedCoachType = 'Type de coach';
  selectedAccr = 'Accréditations';
  settings = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getUserProfileList();
    this.getCompétences();
    this.getAccreditations();
    this.getAllCategorys();

    this.settings = {
      text: 'Sélectionner...',
      position: 'bottom',
      autoPosition: false,
      searchPlaceholderText: 'Rechercher...',
      filterSelectAllText: 'Sélectionner tous les résultats filtrés',
      filterUnSelectAllText: 'Désélectionner tous les résultats filtrés',
      selectAllText: 'Sélectionner tout',
      unSelectAllText: 'Désélectionner tout',
      noDataLabel: 'Aucune donnée disponible',
      enableSearchFilter: true,
      labelKey: 'name',
      primaryKey: '_id',
      classes: 'form-control element-spec multiselect',
    };
  }

  getUserProfileList() {
    this.userService.getAllUser().subscribe((response) => {
      this.data = (response as any).filter((elem) => elem.role == 'Coach');
      this.filteredData = (response as any).filter(
        (elem) => elem.role == 'Coach'
      );
      this.filteredData.forEach((elem) => {
        let a = [];
        elem.competance?.forEach((el) => {
          if (typeof el === 'object') {
            a.push(el.name);
          } else if (typeof el === 'string') {
            a.push(el);
          }
        });
        elem.competances = a.join(', ');
        a = [];
        elem.accreditation?.forEach((el) => {
          if (typeof el === 'object') {
            a.push(el.name);
          } else if (typeof el === 'string') {
            a.push(el);
          }
        });
        elem.accreditations = a.join(', ');
        a = [];
        elem.category?.forEach((el) => {
          if (typeof el === 'object') {
            a.push(el.name);
          } else if (typeof el === 'string') {
            a.push(el);
          }
        });
        elem.categories = a.join(', ');
        elem.status_class =
          elem.status == 'Actif'
            ? 'badge bg-success badge-width'
            : elem.status == 'Inactif'
            ? 'badge bg-danger badge-width'
            : 'badge bg-warning badge-width';
      });
    });
  }

  getCompétences() {
    this.adminService.getAllCompetances().subscribe((response) => {
      this.competences = response as any;
    });
  }

  getAccreditations() {
    this.adminService.getAllAccreditations().subscribe((response) => {
      this.accreditations = response as any;
    });
  }

  getAllCategorys() {
    this.adminService.getAllCategorys().subscribe((response) => {
      this.categories = response as any;
    });
  }

  resetFilters() {
    this.filteredData = this.data;
    this.selectedComp = 'Compétences';
    this.selectedAccr = 'Accréditations';
    this.selectedCoachType = 'Type de coach';
    this.selectedContent = 'Type de contenus';
    this.filterString = '';
  }

  public onOptionsSelected(event, selectname: string) {
    const value = event.target.value;
    if (this.filteredData.length == 0) this.filteredData = this.data;
    if (selectname == 'comp') {
      this.filteredData = this.filteredData.filter((elem) =>
        elem.competances.toLowerCase().includes(value.toLowerCase())
      );
    }
    if (selectname == 'accr') {
      this.filteredData = this.filteredData.filter((elem) => {
        elem.accreditations.toLowerCase().includes(value.toLowerCase());
      });
    }
  }
  filterInputChanged(event) {
    this.filteredData = this.data.filter(
      (elem) =>
        elem.competances
          ?.toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        elem.accreditations
          ?.toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        elem.categories
          ?.toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        elem.prenom?.toLowerCase().includes(event.target.value.toLowerCase()) ||
        elem.nom?.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }

  goToCoachDEtails(coach) {
    this.router.navigateByUrl('/pages/client/coach-detail', {
      state: { id: coach },
    });
  }
}
