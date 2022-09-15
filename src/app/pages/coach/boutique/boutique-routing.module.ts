import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoutiqueAddComponent } from './boutique-add/boutique-add.component';
import { BoutiqueEditComponent } from './boutique-edit/boutique-edit.component';
import { BoutiqueListComponent } from './boutique-list/boutique-list.component';
import { BoutiqueViewComponent } from './boutique-view/boutique-view.component';

const routes: Routes = [
  { path: '', component: BoutiqueListComponent },
  {
    path: 'add',
    component: BoutiqueAddComponent,
  },

  { path: 'view/:id', component: BoutiqueViewComponent },

  { path: 'edit/:id', component: BoutiqueEditComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoutiqueRoutingModule {}
