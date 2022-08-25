import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss'],
})
export class AddFieldComponent implements OnInit {
  @Input() title: string;
  @Input() hasItems: number;
  @Output() onAdd = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleDelete() {
    this.onDelete.emit();
  }

  handleAdd() {
    this.onAdd.emit();
  }
}
