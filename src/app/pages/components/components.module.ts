import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  declarations: [SubHeaderComponent, AvatarComponent],
  exports: [SubHeaderComponent],
  imports: [CommonModule, BsDropdownModule],
})
export class ComponentsModule {}
