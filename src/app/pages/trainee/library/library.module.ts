import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryListComponent } from './library-list/library-list.component';
import { LibraryViewComponent } from './library-view/library-view.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { BoutiqueModule } from '../../coach/boutique/boutique.module';

@NgModule({
  declarations: [LibraryListComponent, LibraryViewComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    ComponentsModule,
    FormsModule,
    SharedModule,
    BoutiqueModule,
  ],
})
export class LibraryModule {}
