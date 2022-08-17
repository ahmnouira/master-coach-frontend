import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoutiqueAddComponent } from './boutique-add/boutique-add.component';
import { BoutiqueListComponent } from './boutique-list/boutique-list.component';

const routes: Routes = [
  { path: '', component: BoutiqueListComponent },
  {
    path: 'add',
    component: BoutiqueAddComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoutiqueRoutingModule {}
