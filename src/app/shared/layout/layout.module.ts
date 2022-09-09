import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [ SidebarComponent,  SidebarItemComponent],

  exports: [SidebarComponent],

  imports: [CommonModule, RouterModule],
})
export class LayoutModule {}
