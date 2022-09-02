import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() model: any;

  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() label: string;
  @Input() title: string;
  @Input() id?: string;
  @Input() disabled?: boolean;

  @Input() checked?: boolean;

  constructor() {}

  ngOnInit(): void {
    if (this.label && !this.id) {
      this.id = this.label.toLowerCase();
    }
  }

  handleChange(event: any) {
    this.modelChange.emit(event.target.checked);
  }
}
