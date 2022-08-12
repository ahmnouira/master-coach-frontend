import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

@NgModule({
  declarations: [LoginComponent, CreateUserComponent, ResetPasswordComponent, ForgotPasswordComponent, ConfirmEmailComponent],
  imports: [CoreRoutingModule, CommonModule, FormsModule],
})
export class CoreModule {}
