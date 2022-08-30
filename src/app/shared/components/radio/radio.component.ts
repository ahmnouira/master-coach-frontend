import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Input() model: any;

  @Input() name: string = 'radios';
  @Input() value: string;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() label: string;
  @Input() title: string;
  @Input() id?: string;

  @Input() disabled?: boolean;

  checked?: boolean;

  constructor() {}

  ngOnInit(): void {
    if (this.label && !this.id) {
      this.id = this.label.toLowerCase();
    }
    this.checked = this.model == this.value;

    console.log('modal', this.model, this.value, this.checked);
  }

  handleChange(event: any) {
    this.modelChange.emit(event.target.value);
  }
}
