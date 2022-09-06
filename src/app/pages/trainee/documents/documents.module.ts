import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { LoadingCardModule } from 'src/app/shared/loading-card/loading-card.module';
import { DatatableModule } from 'src/app/shared/datatable/datatable.module';
import { DocumentsListComponent } from './documents-list/documents-list.component';

@NgModule({
  declarations: [DocumentsListComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    FormsModule,
    SharedModule,
    ComponentsModule,
    LoadingCardModule,
    DatatableModule,
  ],
})
export class DocumentsModule {}
