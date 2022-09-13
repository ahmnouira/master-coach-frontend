import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit {
  @Input() model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() label: string = '';
  @Input() rows: string = '5';
  @Input() pattern?: string;
  @Input() name?: string;
  @Input() id?: string;
  @Input() placeholder?: string;
  @Input() patternError?: string;
  @Input() required: boolean = true;

  @Input() variant: 'primary' | 'secondary' = 'primary'

  @Input() form?: any = undefined;

  constructor() {}

  ngOnInit(): void {
    this.name = this.label ? this.label.toLowerCase() : '';
    this.id = this.id ?? this.name ?? '';
    this.placeholder = this.placeholder ?? this.label;
  }

  handleChange(event: any) {
    this.modelChange.emit(event.target.value);
  }
}
