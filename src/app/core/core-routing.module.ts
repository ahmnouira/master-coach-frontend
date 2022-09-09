import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
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
    loadChildren: () =>
      import('./reset-password/reset-password.module').then(
        (module) => module.ResetPasswordModule
      ),
  },

  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (module) => module.ForgotPasswordModule
      ),
  },

  {
    path: 'email-confirmed',
    component: ConfirmEmailComponent,
  },

  { path: 'verify-email', component: VerifyEmailComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),

    /*
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
      enableTracing: true,
      urlUpdateStrategy: 'eager',
    }),
  */
  ],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
