import { Component, OnInit } from '@angular/core';
import { FormHelper } from 'src/app/helpers/FormHelper';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent extends FormHelper implements OnInit {
  form = {
    newPassword: '',
    confirmPassword: '',
    passwordChangedFlag: false,
    confirmPasswordChangedFlag: false,
  };

  constructor() {
    super();
  }

  ngOnInit(): void {}

  // [required]="form.newPassword.length > 0"

  async submit() {
    const { newPassword, confirmPassword } = this.form;

    if (!newPassword || !confirmPassword) return;

    this.isLoading = true;
  }

  passwordChanged() {
    this.form.passwordChangedFlag = this.form.newPassword.length > 0;
  }
  confirmPasswordChanged() {
    this.form.confirmPasswordChangedFlag = this.form.newPassword.length > 0;
  }
}
