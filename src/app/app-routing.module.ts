import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'core',
    loadChildren: () =>
      import('./core/core.module').then((module) => module.CoreModule),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((module) => module.PagesModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
