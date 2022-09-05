import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatableModule } from 'src/app/shared/datatable/datatable.module';
import { LoadingCardModule } from 'src/app/shared/loading-card/loading-card.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { PurchasesListComponent } from './purchases-list/purchases-list.component';

const routes: Routes = [
  { path: '', component: PurchasesListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    LoadingCardModule,
    DatatableModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class PurchasesRoutingModule {}
