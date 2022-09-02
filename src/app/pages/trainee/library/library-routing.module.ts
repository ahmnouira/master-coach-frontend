import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryListComponent } from './library-list/library-list.component';
import { LibraryViewComponent } from './library-view/library-view.component';

const routes: Routes = [
  { path: '', component: LibraryListComponent },
  { path: 'view/:id', component: LibraryViewComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
