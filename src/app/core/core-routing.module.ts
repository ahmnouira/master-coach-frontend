import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

const route =sessionStorage.getItem('route')

const routes: Routes = [

  {
    path: '',
    redirectTo: route ?? 'login',
    pathMatch :'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create-user/:type',
    component: CreateUserComponent,
  },

  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },

  {
    path: 'email-confirmed',
    component: ConfirmEmailComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
