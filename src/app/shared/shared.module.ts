import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ModalAjoutSessionComponent } from './components/modal-ajout-session/modal-ajout-session.component';
import { ModalCalendrierComponent } from './components/modal-calendrier/modal-calendrier.component';
import { ModalSatisfactionComponent } from './components/modal-satisfaction/modal-satisfaction.component';
import { ModalGoogleAgendaComponent } from './components/modal-google-agenda/modal-google-agenda.component';
import { MessagerieComponent } from './components/messagerie/messagerie.component';
import { CommandeDetailComponent } from './components/commande-detail/commande-detail.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ComponentsModule } from '../pages/components/components.module';
import { ModalWorkingHoursComponent } from './components/modal-working-hours/modal-working-hours.component';
import { VisioConferenceComponent } from './components/visio-conference/visio-conference.component';
import { ModalSuccesComponent } from './components/modal-succes/modal-succes.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    ModalAjoutSessionComponent,
    CommandeDetailComponent,
    ModalCalendrierComponent,
    ModalSatisfactionComponent,
    ModalGoogleAgendaComponent,
    MessagerieComponent,
    ModalWorkingHoursComponent,
    VisioConferenceComponent,
    ModalSuccesComponent,
    CommandeDetailComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    NgxSmartModalModule.forChild(),
    FormsModule,
    BsDatepickerModule,
    TimepickerModule,
    ComponentsModule,
    PickerModule,
    TooltipModule,
  ],
  exports: [
    ModalAjoutSessionComponent,
    ModalCalendrierComponent,
    ModalSatisfactionComponent,
    ModalGoogleAgendaComponent,
    CommandeDetailComponent,
    MessagerieComponent,
    ModalWorkingHoursComponent,
    VisioConferenceComponent,
    ModalSuccesComponent,
    LoaderComponent,
  ],
})
export class SharedModule {}
