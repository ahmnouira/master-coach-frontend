import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path : 'core',
    loadChildren: () => import('./core/core.module').then(module => module.CoreModule)
  },
  {
    path : 'pages',
    loadChildren: () => import('./pages/pages.module').then(module => module.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
