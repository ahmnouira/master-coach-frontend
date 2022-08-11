import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [SubHeaderComponent],
  exports: [SubHeaderComponent],
  imports: [CommonModule, BsDropdownModule],
})
export class ComponentsModule {}
