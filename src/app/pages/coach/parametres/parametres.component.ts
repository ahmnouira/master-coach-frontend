import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { IUser } from 'src/app/interfaces/user-interface';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user-model';
import { FileHelper } from 'src/app/helpers/FileHelper';
import { Observable } from 'rxjs';

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
    this.getSelectField('skills');
    this.getSelectField('categories');
    this.getSelectField('certifications');
    this.isLoading = false;
  }

  /** TODO: check this if it works **/
  handleSubmit(f: NgForm) {
    console.log('f', f.errors);
    this.f = f;
  }


  submit() {
    this.isSubmitting = true;
    const { prenom, nom, bio, tel, email, photo } = this.form;
    // +33122469999
    if (!prenom || !nom || !bio || !tel || !email || !photo) {
      this.isSubmitting = false;
      return;
    }
    let formData = new FormData();
    for (const key in this.form) {
      if (key === 'photo' && this.form.photo) {
        if (typeof this.form.photo === 'string') {
          continue;
        } else {
          const file = this.form.photo as File;
          formData.append(key, file);
        }
      }
      formData.append(key, this.form[key]);
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

  getUser() {
    const user = this.tokenStorageService.getUser() as IUser;
    // TODO: casting doesn't work property

    console.log('cinF', user.cinF)

    this.form = {
      bio: user.bio || '',
      category: user.category || [],
      accreditation: user.accreditation || [],
      cinB: this.getFileUrl(user.cinB),
      cinF: this.getFileUrl(user.cinF),
      email: user.email,
      prenom: user.prenom || '',
      kbis: this.getFileUrl(user.kbis),
      nom: user.nom || '',
      photo: this.getFileUrl(user.photo),
      competance: user.competance || [],
      tel: user.tel || '',
      urssaf: user.urssaf || '',
    };

    console.log(this.form)
  }

  getFileUrl(url: any): string {
    return FileHelper.getUrl(url);
  }

  getSelectField(name: 'categories' | 'skills' | 'certifications') {
    let action: Observable<any>;
    switch (name) {
      case 'categories':
        action = this.adminService.getAllCategorys();
        break;
      case 'skills':
        action = this.adminService.getAllCompetances();
        break;
      case 'certifications':
        action = this.adminService.getAllAccreditations();
        break;
      default:
        break;
    }
    action.subscribe(
      (res) => {
        this[name] = res;
      },
      (error) => {
        this.onError(error);
      }
    );
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

  passwordChanged() {
    this.passwordForm.passwordChangedFlag =
      this.passwordForm.newPassword.length > 0;
  }
  confirmPasswordChanged() {
    this.passwordForm.confirmPasswordChangedFlag =
      this.passwordForm.newPassword.length > 0;
  }

  handleDeleteFile(field: any) {
    this.form[field] = '';
  }

  handleImportFile(data: File, key: string) {
    this.form[key] = data;
  }

  downloadPdf(base64String, fileName) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement('a');
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }
}
