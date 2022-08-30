import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { BoutiqueModule } from '../boutique/boutique.module';
import { LoadingCardModule } from 'src/app/shared/loading-card/loading-card.module';
import { DatatableModule } from 'src/app/shared/datatable/datatable.module';
import { DocumentsAddComponent } from './documents-add/documents-add.component';

@NgModule({
  declarations: [DocumentsListComponent, DocumentsAddComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    SharedModule,
    ComponentsModule,
    FormsModule,
    BoutiqueModule,
    LoadingCardModule,
    DatatableModule
  ],
})
export class DocumentsModule {}
