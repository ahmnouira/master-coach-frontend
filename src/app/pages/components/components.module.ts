import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AvatarComponent } from './avatar/avatar.component';
import { SubHeaderItemComponent } from './sub-header-item/sub-header-item.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';

@NgModule({
  declarations: [
    SubHeaderComponent,
    AvatarComponent,
    SubHeaderItemComponent,
    NotificationItemComponent,
  ],
  exports: [SubHeaderComponent],
  imports: [CommonModule, BsDropdownModule],
})
export class ComponentsModule {}
