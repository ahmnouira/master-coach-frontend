import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-tools',
  templateUrl: './card-tools.component.html',
  styleUrls: ['./card-tools.component.scss'],
})
export class CardToolsComponent implements OnInit {
  @Input() path: string;

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  handleDelete() {
    this.onDelete.emit();
  }
}
