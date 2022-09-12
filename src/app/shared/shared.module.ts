import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ModalAjoutSessionComponent } from './components/modal-ajout-session/modal-ajout-session.component';
import { ModalCalendrierComponent } from './components/modal-calendrier/modal-calendrier.component';
import { ModalSatisfactionComponent } from './components/modal-satisfaction/modal-satisfaction.component';
import { ModalGoogleAgendaComponent } from './components/modal-google-agenda/modal-google-agenda.component';
import { MessagerieComponent } from './components/messagerie/messagerie.component';
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
import { ImportIconComponent } from './icons/import-icon/import-icon.component';
import { FileImportedComponent } from './components/file-imported/file-imported.component';
import { DividerComponent } from './components/divider/divider.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { TitledFieldComponent } from './components/titled-field/titled-field.component';
import { EmptyPageComponent } from './components/empty-page/empty-page.component';
import { RightImageComponent } from './components/right-image/right-image.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { ButtonComponent } from './components/button/button.component';
import { UserPhotoComponent } from './components/user-photo/user-photo.component';
import { FormComponent } from './components/form/form.component';
import { SelectComponent } from './components/select/select.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { RadioComponent } from './components/radio/radio.component';
import { AddFieldComponent } from './components/add-field/add-field.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormWrapperComponent } from './components/form-wrapper/form-wrapper.component';
import { PageListWrapperComponent } from './components/page-list-wrapper/page-list-wrapper.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { FormFooterComponent } from './components/form-footer/form-footer.component';
import { PageHeaderWrapperComponent } from './components/page-header-wrapper/page-header-wrapper.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { TabsWizardComponent } from './components/tabs-wizard/tabs-wizard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CountdownComponent } from './countdown/countdown.component';
import { CountdownModule } from 'ngx-countdown';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  declarations: [
    ModalAjoutSessionComponent,
    ModalCalendrierComponent,
    ModalSatisfactionComponent,
    ModalGoogleAgendaComponent,
    MessagerieComponent,
    ModalWorkingHoursComponent,
    VisioConferenceComponent,
    ModalSuccesComponent,
    LoaderComponent,
    ImportIconComponent,
    FileImportedComponent,
    DividerComponent,
    TextFieldComponent,
    CheckboxComponent,
    StripePaymentComponent,
    FileUploaderComponent,
    TextAreaComponent,
    TitledFieldComponent,
    TitledFieldComponent,
    EmptyPageComponent,
    RightImageComponent,
    FormErrorComponent,
    ButtonComponent,
    UserPhotoComponent,
    FormComponent,
    SelectComponent,
    RadioComponent,
    AddFieldComponent,
    ModalComponent,
    FormWrapperComponent,
    PageListWrapperComponent,
    SearchComponent,
    FormFooterComponent,
    PageHeaderWrapperComponent,
    PageWrapperComponent,
    UserCardComponent,
    ProductInfoComponent,
    UpdatePasswordComponent,
    TabsWizardComponent,
    CalendarComponent,
    CountdownComponent,
    TabsComponent,
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
    AngularMultiSelectModule,
    CountdownModule,
    RouterModule, // to use routerLink
  ],
  exports: [
    ModalAjoutSessionComponent,
    ModalCalendrierComponent,
    ModalSatisfactionComponent,
    ModalGoogleAgendaComponent,
    MessagerieComponent,
    ModalWorkingHoursComponent,
    VisioConferenceComponent,
    ModalSuccesComponent,
    ImportIconComponent,
    FileImportedComponent,
    // new components
    LoaderComponent,
    DividerComponent,
    TextFieldComponent,
    TextAreaComponent,
    TitledFieldComponent,
    CheckboxComponent,
    FileUploaderComponent,
    StripePaymentComponent,
    EmptyPageComponent,
    RightImageComponent,
    FormErrorComponent,
    ButtonComponent,
    SelectComponent,
    UserPhotoComponent,
    FormComponent,
    RadioComponent,
    AddFieldComponent,
    ModalComponent,
    FormWrapperComponent,
    PageListWrapperComponent,
    SearchComponent,
    FormFooterComponent,
    PageHeaderWrapperComponent,
    PageWrapperComponent,
    UserCardComponent,
    ProductInfoComponent,
    UpdatePasswordComponent,
    TabsWizardComponent,
    CalendarComponent,
    TabsComponent,
  ],
})
export class SharedModule {}
