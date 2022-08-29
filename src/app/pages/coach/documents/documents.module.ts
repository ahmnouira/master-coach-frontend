import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { BoutiqueModule } from '../boutique/boutique.module';

@NgModule({
  declarations: [DocumentsListComponent],
  imports: [CommonModule, DocumentsRoutingModule,  SharedModule, ComponentsModule, FormsModule, BoutiqueModule ],
})
export class DocumentsModule {}
