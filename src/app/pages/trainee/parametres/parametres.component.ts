import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../services/token-storage.service';
import { UserService } from '../../../services/user-service.service';
import { AdminService } from '../../../services/admin.service';
import { User } from '../../../core/models/user-model';
import { AuthService } from 'src/app/core/auth.service';

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
  settings = {};
  newPassword = '';
  confirmPassword = '';
  passwordChangedFlag = false;
  confirmPasswordChangedFlag = false;
  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.getUserFromDb(user._id);
    this.form.photo = this.form.photo
      ? this.form.photo
      : '/assets/img/common/utilisateur.png';
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
      classes: 'form-control element-spec',
    };
    this.getCompetences();
    this.getCategories();
  }

  importFile(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.photo = reader.result as string;

        /*this.imageSrc = reader.result as string;

        this.myForm.patchValue({
          fileSource: reader.result
        });*/
      };
    }
  }

  saveUser() {
    this.userService.updateUser(this.form, this.form._id).subscribe(
      (res) => {},
      (error) => {
        window.alert(error.message);
      }
    );
    if (this.newPassword != '' && this.newPassword == this.confirmPassword) {
      this.authService
        .resetPassword({
          email: this.form.email,
          new_password: this.newPassword,
        })
        .subscribe(
          (res) => {},
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

  passwordChanged() {
    this.passwordChangedFlag = this.newPassword.length > 0;
  }
  confirmPasswordChanged() {
    this.confirmPasswordChangedFlag = this.confirmPassword.length > 0;
  }

  private getUserFromDb(id: any) {
    this.userService.getSingleUser(id).subscribe(
      (user) => {
        this.form = user;
      },
      (error) => {
        return {};
      }
    );
  }
}
