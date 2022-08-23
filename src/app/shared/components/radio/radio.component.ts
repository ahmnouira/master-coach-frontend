import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Input() model: any;

  @Input() name: string = 'radios';

  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() label: string;
  @Input() title: string;
  @Input() id?: string;

  @Input() checked?: boolean;

  constructor() {}

  ngOnInit(): void {
    if (this.label && !this.id) {
      this.id = this.label.toLowerCase();
    }

    this.checked = this.model;
    console.log(this.label, 'name:', this.name, 'id:', this.id, this.model);
  }

  handleChange(event: any) {
    console.log('checked', this.id, event.target.checked);
    this.modelChange.emit(event.target.checked);
  }
}
