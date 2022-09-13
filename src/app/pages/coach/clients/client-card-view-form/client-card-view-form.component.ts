import { Component, OnInit } from '@angular/core';
import { FormSimpleHelper } from 'src/app/helpers/FormSimpleHelper';

type Form = {
  notes: string
}

@Component({
  selector: 'app-client-card-view-form',
  templateUrl: './client-card-view-form.component.html',
  styleUrls: ['./client-card-view-form.component.scss']
})
export class ClientCardViewFormComponent extends FormSimpleHelper implements OnInit {

  form: Form = {
    notes: ''
  };

  constructor() {
    super();
  }

  ngOnInit(): void {
  }



  submit(): void {
    throw new Error('Method not implemented.');
  }

}
