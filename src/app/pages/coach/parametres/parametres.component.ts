import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { IUser } from 'src/app/interfaces/user-interface';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user-model';
import { Picture } from 'src/app/helpers/getUserPicture';

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

  addPhoto(data: File) {
    this.form.photo = data as File;
    console.log('photo: ', data, this.form.photo);
  }

  submit() {
    this.isSubmitting = true;
    const { prenom, nom, bio, tel, email, photo, category } = this.form;
    // +33122469999
    if (!prenom || !nom || !bio || !tel || !email || !photo) {
      this.isSubmitting = false;
      return;
    }

    let formData = new FormData();
    for (const key in this.form) {
      if (this.form[key]) {
        if (key === 'photo') {
          if (typeof this.form.photo === 'string') {
            continue;
          } else {
            const file = this.form.photo as File;

            console.log('its File', file);
            formData.append(key, file);
          }
        }
        formData.append(key, this.form[key]);
      }
    }

    this.authService.updateProfile(formData).subscribe(
      (res) => {
        console.log('res', res);
        if (!res.success) {
          this.onError(res.error);
          return;
        }

        this.error = '';
        this.authService.currentUser$.next(res.data as User);
        this.tokenStorageService.saveUser(res.data);
        this.isSubmitting = false;
      },
      (error) => {
        console.log('submitError', error);
        this.onError(error);
      }
    );
  }

  onError(error: any) {
    console.error('error:', error);
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

  removeUndefined(value: string) {
    return value.replace(/undefined/g, '');
  }

  getUser() {
    const user = this.tokenStorageService.getUser() as IUser;
    // TODO: casting doesn't work property

    console.log('user', user);

    this.form = {
      bio: user.bio || '',
      category: [],
      accreditation: [],
      cinB: this.removeUndefined(user.cinB as string) || '',
      cinF: this.removeUndefined(user.cinF as string) || '',
      email: user.email,
      prenom: user.prenom || '',
      kbis: this.removeUndefined(user.kbis as string) || '',
      nom: user.nom || '',
      photo: Picture.getUrl(user.photo) || '',
      competance: [],
      tel: user.tel || '',
      urssaf: user.urssaf || '',
    };
  }

  getCategories() {
    this.adminService.getAllCategorys().subscribe(
      (res) => {
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
        this.certifications = res;
      },
      (error) => {
        console.error(error);
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
