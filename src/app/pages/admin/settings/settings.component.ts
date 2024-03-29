import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user-service/user-service.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
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
    if (!this.form.photo) {
      this.form.photo =
        'assets/img/common/ceo-of-company-in-business-offices-2021-08-26-17-31-26-utc.png';
    }
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
        console.error(error.message);
      }
    );
    if (this.newPassword != '' && this.newPassword == this.confirmPassword) {
      this.authService
        .resetPassword({
          password: this.form.password,
          // new_password: this.newPassword,
          token: '',
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

  passwordChanged() {
    this.passwordChangedFlag = this.form.password.length > 0;
  }
  confirmPasswordChanged() {
    this.confirmPasswordChangedFlag = this.form.password.length > 0;
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
