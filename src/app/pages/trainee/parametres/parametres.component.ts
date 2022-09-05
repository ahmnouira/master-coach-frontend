import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { IClient } from 'src/app/interfaces/client.interface';
import { FormHelper } from 'src/app/helpers/FormHelper';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
  animations: Animations
})
export class ParametresComponent extends FormHelper implements OnInit {

  form: Partial<IClient> = {};

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
    this.isLoading = false;
  }

  submit() {
    this.isSubmitting = true;
    const { prenom, nom, tel, email, photo } = this.form;
    // +33122469999
    if (!prenom || !nom || !tel || !email || !photo) {
      this.isSubmitting = false;
      return;
    }
    const formData = this.getFormData(this.form);

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
    const user = this.tokenStorageService.getUser() as IClient;
    // TODO: casting doesn't work property
    this.form = {
      email: this.getString(user.email),
      prenom: this.getString(user.prenom),
      nom: this.getString(user.nom),
      photo: this.getFileUrl(user.photo),
      tel: this.getString(user.tel),
    };
  }

  handleDeleteFile(field: any) {
    this.form[field] = '';
  }

  handleImportFile(data: File, key: string) {
    this.form[key] = data;
  }
}
