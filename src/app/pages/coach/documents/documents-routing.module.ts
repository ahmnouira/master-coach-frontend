import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsAddComponent } from './documents-add/documents-add.component';
import { DocumentsEditComponent } from './documents-edit/documents-edit.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentsListComponent,
  },

  {
    path: 'add',
    component: DocumentsAddComponent,
  },

  { path: 'edit/:id', component: DocumentsEditComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule {}
