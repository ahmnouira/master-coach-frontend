import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserHelper } from 'src/app/helpers/UserHelper';

@Component({
  selector: 'app-client-item',
  templateUrl: './client-item.component.html',
  styleUrls: ['./client-item.component.scss'],
})
export class ClientItemComponent extends UserHelper implements OnInit {
  @Input() client: any;

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  form: any = {
    selected : ''
  }
  selectedClient: any;

  constructor() {
    super()
  }

  ngOnInit(): void {
    this.init(this.client);
  }

  handleSelectClient(user: any) {}

  handleCheckbox(event: any) {}
}
