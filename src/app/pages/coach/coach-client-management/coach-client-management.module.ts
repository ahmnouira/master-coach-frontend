import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoachClientManagementRoutingModule} from "./coach-client-management-routing.module";
import { CcListComponent } from './cc-list/cc-list.component';
import { CcAddComponent } from './cc-add/cc-add.component';
import {ComponentsModule} from "../../components/components.module";
import {FormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap/modal";



@NgModule({
  declarations: [
    CcListComponent,
    CcAddComponent
  ],
  imports: [
    CommonModule,
    CoachClientManagementRoutingModule,
    ComponentsModule,
    FormsModule,
    ModalModule
  ]
})
export class CoachClientManagementModule { }
