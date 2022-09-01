import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ResetPasswordRoutingModule,
    SharedModule,
  ],
  exports: [ResetPasswordComponent],
})
export class ResetPasswordModule {}
