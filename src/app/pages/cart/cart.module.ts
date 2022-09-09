import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartCardComponent } from './cart-card/cart-card.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CartPaidComponent } from './cart-paid/cart-paid.component';

@NgModule({
  declarations: [CartListComponent, CartCardComponent, CartPaidComponent],

  exports: [CartCardComponent],


  imports: [
    CommonModule,
    CartRoutingModule,
    ComponentsModule,
    SharedModule,
    FormsModule,
  ],
})
export class CartModule {}
