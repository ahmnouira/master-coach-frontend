import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { IUser } from 'src/app/interfaces/user-interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
})
export class ParametresComponent implements OnInit {
  form: Partial<IUser> = {};

  passwordForm = {
    newPassword: '',
    confirmPassword: '',
    passwordChangedFlag: false,
    confirmPasswordChangedFlag: false,
  };

  isLoggedIn = false;
  isLoginFailed = false;

  categories: any = [];
  skills: any = [];
  certifications: any = [];

  isSubmitting = false;
  isLoading = true;
  error = '';

  f: NgForm;

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getSkills();
    this.getCategories();
    this.getCertifications();
    /*
    setTimeout(() => {
      this.isLoading = false;
    }, 200) */
    this.isLoading = false;
  }

  /** TODO: check this if it works **/
  handleSubmit(f: NgForm) {
    console.log('f', f.errors);
    this.f = f;
  }

  submit() {
    this.isSubmitting = true;
    const { firstName, lastName, bio, tel, email, photo } = this.form;

    console.log('from', this.form);

    if (!firstName || !lastName || !bio || !tel || !email || !photo) {
      this.isSubmitting = false;
      return;
    }

    let formData = new FormData();
    this.authService.updateProfile(formData).subscribe(
      (res) => {
        console.log(res);
        // window.location.reload();
      },
      (error) => {
        this.onError(error);
      }
    );
  }
  onError(error: any) {
    console.log('error', error);
    this.error = error;
    this.isSubmitting = false;
    this.isLoading = false;
  }

  resetPassword() {
    const { newPassword, confirmPassword } = this.passwordForm;

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
            this.onError(error);
          }
        );
    }
  }

  getUser() {
    const user = this.tokenStorageService.getUser() as IUser;
    // TODO: casting doesn't work property
    this.form = {
      bio: user.bio,
      categories: user.categories,
      certifications: user.categories,
      cinB: user.cinB,
      cinF: user.cinF,
      email: user.email,
      firstName: user.firstName,
      kbis: user.kbis,
      lastName: user.lastName,
      photo: user.photo,
      skills: user.skills,
      tel: user.tel,
      urssaf: user.urssaf,
    };

    console.log('user', user, this.form);
  }

  getCategories() {
    this.adminService.getAllCategorys().subscribe(
      (res) => {
        console.log(res);
        this.categories = res;
      },
      (error) => {
        this.onError(error);
      }
    );
  }

  getSkills() {
    this.adminService.getAllCompetances().subscribe(
      (res) => {
        console.log(res);
        this.skills = res;
      },
      (error) => {
        this.onError(error);
      }
    );
  }

  getCertifications() {
    this.adminService.getAllAccreditations().subscribe(
      (res) => {
        console.log(res);
        this.certifications = res;
      },
      (error) => {
        console.error(error.message);
      }
    );
  }

  passwordChanged() {
    this.passwordForm.passwordChangedFlag =
      this.passwordForm.newPassword.length > 0;
  }
  confirmPasswordChanged() {
    this.passwordForm.confirmPasswordChangedFlag =
      this.passwordForm.newPassword.length > 0;
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
