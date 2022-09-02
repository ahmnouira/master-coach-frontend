import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { IUser } from 'src/app/interfaces/user-interface';
import { Observable } from 'rxjs';
import { FormHelper } from 'src/app/helpers/FormHelper';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
  animations: Animations,
})
export class ParametresComponent extends FormHelper implements OnInit {
  form: Partial<IUser> = {};

  categories: any = [];
  skills: any = [];
  certifications: any = [];

  selectedCategories: any[] = [];

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

  submit() {
    this.isSubmitting = true;
    const { prenom, nom, bio, tel, email, photo, category } = this.form;
    // +33122469999
    if (!prenom || !nom || !bio || !tel || !email || !photo) {
      this.isSubmitting = false;
      return;
    }
    const formData = this.getFormData(this.form);

    console.log('category', category);

    this.authService.updateProfile(formData).subscribe(
      (res) => {
        if (!res.success) {
          this.onError(res.error);
          return;
        }
        console.log('res', res.data);
        this.authService.currentUser$.next(res.data);
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
      rib: this.getFileUrl(user.rib),
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
