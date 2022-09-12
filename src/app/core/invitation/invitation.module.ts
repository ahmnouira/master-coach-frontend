import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitationRoutingModule } from './invitation-routing.module';
import { InvitationFormComponent } from './invitation-form/invitation-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [InvitationFormComponent],
  imports: [CommonModule, InvitationRoutingModule, FormsModule, SharedModule],
})
export class InvitationModule {}
