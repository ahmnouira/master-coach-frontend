import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesListComponent } from './purchases-list/purchases-list.component';
import { PurchasesViewComponent } from './purchases-view/purchases-view.component';
import { PurchasesTotalComponent } from './purchases-total/purchases-total.component';

@NgModule({
  declarations: [
    PurchasesListComponent,
    PurchasesViewComponent,
    PurchasesTotalComponent,
  ],
  imports: [CommonModule, PurchasesRoutingModule],
})
export class PurchasesModule {}
