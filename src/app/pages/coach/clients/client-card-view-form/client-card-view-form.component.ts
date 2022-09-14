import { Component, Input, OnInit } from '@angular/core';
import { FormSimpleHelper } from 'src/app/helpers/FormSimpleHelper';
import { CoachService } from 'src/app/services/coach-service/coach.service';

type Form = {
  notes: string;
};

@Component({
  selector: 'app-client-card-view-form',
  templateUrl: './client-card-view-form.component.html',
  styleUrls: ['./client-card-view-form.component.scss'],
})
export class ClientCardViewFormComponent
  extends FormSimpleHelper
  implements OnInit
{
  @Input() id: string;

  form: Form = {
    notes: '',
  };

  constructor(private coachService: CoachService) {
    super();
  }

  ngOnInit(): void {}

  submit() {
    const { notes } = this.form;

    this.submitData(this.coachService.editClientNote('', notes), {
      notes,
    });
  }
}
