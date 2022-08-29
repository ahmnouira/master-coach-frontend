import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsListComponent } from './documents-list/documents-list.component';

@NgModule({
  declarations: [DocumentsListComponent],
  imports: [CommonModule, DocumentsRoutingModule],
})
export class DocumentsModule {}
