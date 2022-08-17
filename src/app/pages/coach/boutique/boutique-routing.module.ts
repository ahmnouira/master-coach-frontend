import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoutiqueListComponent } from './boutique-list/boutique-list.component';


const routes: Routes = [
  { path: '', component:  BoutiqueListComponent },
 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoutiqueRoutingModule {}
