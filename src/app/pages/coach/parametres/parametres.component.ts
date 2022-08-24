import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { IUser } from 'src/app/interfaces/user-interface';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user-model';
import { Observable } from 'rxjs';
import { FormHelper } from 'src/app/helpers/FormHelper';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
})
export class ParametresComponent extends FormHelper implements OnInit {
  form: Partial<IUser> = {};

  passwordForm = {
    newPassword: '',
    confirmPassword: '',
    passwordChangedFlag: false,
    confirmPasswordChangedFlag: false,
  };

  categories: any = [];
  skills: any = [];
  certifications: any = [];

  f: NgForm;

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private adminService: AdminService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getUser();
    this.getSelectField('skills');
    this.getSelectField('categories');
    this.getSelectField('certifications');
    this.isLoading = false;
  }

  /** TODO: check this if it works **/
  handleSubmit(f: NgForm) {
    // console.log('f', f.errors);
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

    const formData = this.getFormData(this.form);

    this.authService.updateProfile(formData).subscribe(
      (res) => {
        // console.log('res', res);
        if (!res.success) {
          this.onError(res.error);
          return;
        }
        this.authService.currentUser$.next(res.data as User);
        this.tokenStorageService.saveUser(res.data);
        this.onSuccess();
      },
      (error) => {
        this.onError(error);
      }
    );
  }

  getUser() {
    const user = this.tokenStorageService.getUser() as IUser;
    // TODO: casting doesn't work property
    this.form = {
      bio: this.getString(user.bio),
      category: this.getArray(user.category),
      accreditation: this.getArray(user.accreditation),
      cinB: this.getFileUrl(user.cinB),
      cinF: this.getFileUrl(user.cinF),
      email: this.getString(user.email),
      prenom: this.getString(user.prenom),
      kbis: this.getFileUrl(user.kbis),
      nom: this.getString(user.nom),
      photo: this.getFileUrl(user.photo),
      competance: this.getArray(user.competance),
      tel: this.getString(user.tel),
      urssaf: this.getString(user.urssaf),
    };
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
