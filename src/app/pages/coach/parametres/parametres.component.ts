import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from 'src/app/services/user-service/user-service.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
})
export class ParametresComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userCategory: any = [];
  userCompetences: any = [];
  userAccred: any = [];
  settings = {};
  newPassword = '';
  confirmPassword = '';
  passwordChangedFlag = false;
  confirmPasswordChangedFlag = false;

  isLoading = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private authService: AuthService,
    private adminService: AdminService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.getUserFromDb(user._id);

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
    this.getCompetences();
    this.getCategories();
    this.getAccredi();
  }

  importFile(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file);
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log(reader.result);
        this.form.photo = reader.result as string;
      };
    }
  }

  saveUser() {
    this.userService.updateUser(this.form, this.form._id).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (error) => {
        console.error(error.message);
      }
    );
    if (this.newPassword != '' && this.newPassword == this.confirmPassword) {
      this.authService
        .resetPassword({
          password: this.form.password,

          token: '',
        })
        .subscribe(
          (res) => {
            console.log(res);
          },
          (error) => {
            this.errorMessage = error;
            console.error(this.errorMessage);
            this.isLoginFailed = true;
          }
        );
    }
  }

  getCategories() {
    this.adminService.getAllCategorys().subscribe(
      (res) => {
        console.log(res);
        this.userCategory = res;
      },
      (error) => {
        console.error(error.message);
      }
    );
  }

  getCompetences() {
    this.adminService.getAllCompetances().subscribe(
      (res) => {
        console.log(res);
        this.userCompetences = res;
      },
      (error) => {
        console.error(error.message);
      }
    );
  }

  getAccredi() {
    this.adminService.getAllAccreditations().subscribe(
      (res) => {
        console.log(res);
        this.userAccred = res;
      },
      (error) => {
        console.error(error.message);
      }
    );
  }

  passwordChanged() {
    this.passwordChangedFlag = this.form.password.length > 0;
  }
  confirmPasswordChanged() {
    this.confirmPasswordChangedFlag = this.form.password.length > 0;
  }

  // cin front
  importCINFront(data: any) {
    // blob
    this.form.cinF = data;
  }

  importCINBack(data: any) {
    this.form.cinB = data;
  }

  importKbis(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file);
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log(reader.result);
        this.form.kbis = reader.result as string;
      };
    }
  }

  private getUserFromDb(id: any) {
    this.userService.getSingleUser(id).subscribe(
      (user) => {
        this.form = { ...user };
      },
      (error) => {
        return {};
      }
    );
  }

  downloadPdf(base64String, fileName) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement('a');
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }
}
