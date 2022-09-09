import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesListComponent } from './purchases-list/purchases-list.component';
import { PurchasesViewComponent } from './purchases-view/purchases-view.component';
import { CartModule } from '../../cart/cart.module';

@NgModule({
  declarations: [PurchasesListComponent, PurchasesViewComponent],
  imports: [CommonModule, PurchasesRoutingModule, CartModule],
})
export class PurchasesModule {}
