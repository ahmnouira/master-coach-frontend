import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from 'src/app/services/user-service/user-service.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { IUser } from 'src/app/interfaces/user-interface';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
})
export class ParametresComponent implements OnInit {
  form: Partial<IUser> = {}

  passwordForm = {
    newPassword : "",
    confirmPassword: '',
    passwordChangedFlag : false,
    confirmPasswordChangedFlag : false,
  }

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  userCategory: any = [];
  userCompetences: any = [];
  userAccred: any = [];

  isLoading = true;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private authService: AuthService,
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser() as IUser;
    this.form = {...user}
    this.getCompetences();
    this.getCategories();
    this.getAccredi();
    this.isLoading = false
  }


  saveUser() {
    this.isLoading = true
    const { firstName, lastName, bio,  } = this.form;

    if (!firstName || !lastName || !bio) {
      this.isLoading = false
      return;
    }

    let formData = new FormData();

    this.authService.updateProfile(formData).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (error) => {
        console.error(error.message);
      }
    );
 
  }


  resetPassword() {

    const {newPassword, confirmPassword}  = this.passwordForm

    if (newPassword != '' && newPassword == confirmPassword) {
      this.authService
        .resetPassword({
          password: newPassword,

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
    this.passwordForm.passwordChangedFlag = this.passwordForm.newPassword.length > 0;
  }
  confirmPasswordChanged() {
    this.passwordForm.confirmPasswordChangedFlag = this.passwordForm.newPassword.length > 0;
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


  // cin front
  importCINFront(data: any) {
    // blob
    this.form.cinF = data;
  }

  importCINBack(data: any) {
    this.form.cinB = data;
  }

  importKbis(event: any) {
    this.form.kbis = event;
  }

  downloadPdf(base64String, fileName) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement('a');
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }
}
