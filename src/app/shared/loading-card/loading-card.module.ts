import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingCardComponent } from './loading-card.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [LoadingCardComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoadingCardComponent],
})
export class LoadingCardModule {}
