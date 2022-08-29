import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarItemComponent],

  exports: [SidebarItemComponent],

  imports: [CommonModule, RouterModule],
})
export class LayoutModule {}
