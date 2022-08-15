import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { SharedModule } from '../shared/shared.module';
import { AuthBaseComponent } from './auth-base/auth-base.component';

@NgModule({
  declarations: [
    LoginComponent,
    CreateUserComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ConfirmEmailComponent,
    AuthBaseComponent,
  ],
  imports: [CoreRoutingModule, CommonModule, FormsModule, SharedModule],
})
export class CoreModule {}
