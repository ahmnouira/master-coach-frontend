import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartPaidComponent } from './cart-paid/cart-paid.component';

const routes: Routes = [
  { path: '', component: CartListComponent },
  {path: 'paid', component: CartPaidComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
