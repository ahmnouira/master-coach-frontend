import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientCoachRoutingModule} from './client-coach-routing.module';
import { CoachListComponent } from './coach-list/coach-list.component';
import { CoachCardComponent } from './coach-card/coach-card.component';
import { CoachDetailsComponent } from './coach-details/coach-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DatatableModule } from 'src/app/shared/datatable/datatable.module';
import { LoadingCardModule } from 'src/app/shared/loading-card/loading-card.module';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [CoachListComponent, CoachDetailsComponent, CoachCardComponent],
  imports: [
    CommonModule,
    ClientCoachRoutingModule,
    FormsModule,
    ComponentsModule,
    SharedModule,
   
    LoadingCardModule,
    DatatableModule,
  ]
})
export class ClientCoachModule { }
