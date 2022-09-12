import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitationRoutingModule } from './invitation-routing.module';
import { InvitationFormComponent } from './invitation-form/invitation-form.component';

@NgModule({
  declarations: [InvitationFormComponent],
  imports: [CommonModule, InvitationRoutingModule],
})
export class InvitationModule {}
