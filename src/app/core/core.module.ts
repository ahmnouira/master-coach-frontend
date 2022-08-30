import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { SharedModule } from '../shared/shared.module';
import { AuthBaseComponent } from './auth-base/auth-base.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { CoreRoutingModule } from './core-routing.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

@NgModule({
  declarations: [
    LoginComponent,
    CreateUserComponent,
    ResetPasswordComponent,
    ConfirmEmailComponent,
    AuthBaseComponent,
    VerifyEmailComponent,
  ],
  imports: [
    CoreRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ForgotPasswordModule,
  ],
})
export class CoreModule {}
