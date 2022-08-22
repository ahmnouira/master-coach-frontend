import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent implements OnInit {
  @Input() model: any;
  @Input() label: string = '';
  @Input() showLabel = true;
  @Input() type = 'text';
  @Input() pattern?: string;
  @Input() name?: string;
  @Input() id?: string;
  @Input() placeholder?: string;
  @Input() patternError?: string;
  @Input() required: boolean = true;

  

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();


  constructor() {}

  ngOnInit(): void {
    this.name = this.label ? this.label.toLowerCase() : '';
    this.id = this.id ?? this.name ?? '';
    this.placeholder = this.placeholder ?? this.label;
  }

  handleChange(event: any) {
    console.log('event', event)
    this.onChange.emit(event)
  }


}


