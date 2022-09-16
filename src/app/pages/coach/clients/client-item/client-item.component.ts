import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-client-item',
  templateUrl: './client-item.component.html',
  styleUrls: ['./client-item.component.scss'],
})
export class ClientItemComponent implements OnInit {
  @Input() client: any;

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  selectedClient: any;

  constructor() {}

  ngOnInit(): void {}

  handleSelectClient(user: any) {}

  handleCheckbox(event: any) {}
}
