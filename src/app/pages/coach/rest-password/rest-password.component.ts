import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormHelper } from 'src/app/helpers/FormHelper';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.scss'],
})
export class RestPasswordComponent extends FormHelper implements OnInit {
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
