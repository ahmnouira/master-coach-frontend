import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
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
    currentPassword: '',
    passwordChangedFlag: false,
    confirmPasswordChangedFlag: false,
  };


  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit(): void {}

  async submit() {
    this.isSubmitting = true;
    const { newPassword, confirmPassword, currentPassword } = this.form;
    if (!newPassword || !confirmPassword || !currentPassword) {
      //this.onError('Les champs sont obligatoires!');
      this.onError('')
      return;
    }

    if (newPassword !== confirmPassword) {
      // this.onError('Les mots de passe ne correspondent pas!');
      this.onError('')
      return;
    }


    this.authService
      .updatePassword({ newPassword, currentPassword: currentPassword })
      .subscribe(
        (res) => {
          console.log('res', res);
          this.onSuccess();
          // reset the form
          console.log('f', 'dirty', this.f.dirty, 'pristine',  this.f.pristine)
          this.f?.resetForm() 
          
          /**TODO: fix reset fields   **/
          this.form.newPassword = ''
         
        },
        (error) => {
          this.onError(error);
        }
      ) 


  
  }

  passwordChanged() {
    this.form.passwordChangedFlag = this.form.newPassword.length > 0;
  }
  confirmPasswordChanged() {
    this.form.confirmPasswordChangedFlag = this.form.newPassword.length > 0;
  }
}
